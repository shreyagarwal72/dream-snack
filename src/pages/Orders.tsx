import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ShoppingBag, Clock, Package, MapPin, CreditCard, CheckCircle, ArrowLeft, History, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TruckButton from "@/components/TruckButton";
import { useGlass } from "@/contexts/GlassContext";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Demo menu items
const menuItems = {
  beverages: [
    { id: 1, name: "Indian Chai", price: 15, category: "beverages", description: "Traditional homemade tea" },
    { id: 2, name: "Cappuccino", price: 20, category: "beverages", description: "Fresh coffee with milk foam" },
    { id: 3, name: "Green Tea", price: 15, category: "beverages", description: "Healthy herbal tea" },
    { id: 4, name: "Black Coffee", price: 18, category: "beverages", description: "Strong black coffee" },
  ],
  snacks: [
    { id: 5, name: "Corn Snacks Mix", price: 25, category: "snacks", description: "Crispy corn mixture" },
    { id: 6, name: "Mixed Namkeen", price: 30, category: "snacks", description: "Traditional Indian snacks" },
    { id: 7, name: "Sweet Corn", price: 20, category: "snacks", description: "Boiled sweet corn with spices" },
    { id: 8, name: "Popcorn", price: 15, category: "snacks", description: "Fresh homemade popcorn" },
  ],
};

const Orders = () => {
  const navigate = useNavigate();
  const { glassEnabled } = useGlass();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [pastOrders, setPastOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    specialInstructions: "",
  });

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to place an order",
          variant: "destructive",
        });
        navigate("/auth");
      } else {
        setUser(session.user);
        setOrderDetails(prev => ({
          ...prev,
          name: session.user.user_metadata?.display_name || "",
        }));
        // Fetch past orders
        await fetchPastOrders(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchPastOrders(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPastOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPastOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to place an order",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      // Generate order number
      const generatedOrderNumber = `DS${Date.now().toString().slice(-8)}`;
      
      // Calculate estimated delivery time (10 minutes from now)
      const estimatedDelivery = new Date(Date.now() + 10 * 60 * 1000);

      // Save order to database
      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        order_number: generatedOrderNumber,
        items: cart,
        total_amount: getTotalPrice(),
        delivery_address: orderDetails.address,
        phone: orderDetails.phone,
        payment_method: orderDetails.paymentMethod,
        special_instructions: orderDetails.specialInstructions || null,
        status: 'pending',
        estimated_delivery_time: estimatedDelivery.toISOString(),
      });

      if (error) throw error;

      setOrderNumber(generatedOrderNumber);
      setShowConfirmation(true);
      toast({
        title: "Order Placed Successfully!",
        description: "Your order will be delivered in 10 minutes",
      });

      // Refresh orders list
      await fetchPastOrders(user.id);

      // Reset form after 5 seconds
      setTimeout(() => {
        setShowConfirmation(false);
        setCart([]);
        setOrderDetails({
          name: user?.user_metadata?.display_name || "",
          phone: "",
          address: "",
          paymentMethod: "cash",
          specialInstructions: "",
        });
      }, 5000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      pending: { variant: "secondary", label: "Preparing" },
      confirmed: { variant: "default", label: "Confirmed" },
      on_the_way: { variant: "default", label: "On the Way" },
      delivered: { variant: "outline", label: "Delivered" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };
    const config = statusConfig[status] || { variant: "secondary", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className={`min-h-screen bg-background ${glassEnabled ? 'glass-mode' : ''}`}>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className={`max-w-2xl mx-auto ${glassEnabled ? 'glass-card' : ''}`}>
            <CardContent className="text-center py-12">
              <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full ${glassEnabled ? 'bg-secondary/20 backdrop-blur-sm' : 'bg-secondary/20'}`}>
                <CheckCircle className="w-12 h-12 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your order! Your delicious homemade food will be delivered in 10 minutes.
              </p>
                <div className={`space-y-2 text-left max-w-sm mx-auto mb-8 p-4 rounded-lg ${glassEnabled ? 'glass-card' : 'bg-muted'}`}>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">#{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Time:</span>
                  <span className="font-medium">10 minutes</span>
                </div>
              </div>
              <Button onClick={() => navigate("/")} className={`gap-2 ${glassEnabled ? 'glass-button bg-primary text-primary-foreground' : ''}`}>
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Order Now - Dream Snack | Fresh Homemade Food Delivery in 10 Minutes</title>
        <meta name="description" content="Place your order for fresh homemade food and track delivery in real-time. Choose from our menu of beverages, snacks, and sweets. Fast 10-minute delivery. Cash on delivery available." />
        <meta name="keywords" content="order food online, homemade food order, online food delivery, fast delivery, cash on delivery, order tracking, real-time tracking" />
        <link rel="canonical" href="https://dreamsnack.com/orders" />
        <meta property="og:title" content="Order Now - Dream Snack | 10 Minute Delivery" />
        <meta property="og:description" content="Order fresh homemade food with real-time tracking. Delivered in 10 minutes." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Place Your Order</h1>
          <p className="text-muted-foreground">Select items from our menu and get them delivered in 10 minutes!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="menu" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Order Menu
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Beverages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Beverages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {menuItems.beverages.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <Button size="sm" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Snacks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Snacks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {menuItems.snacks.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <Button size="sm" onClick={() => addToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart & Order Details */}
          <div className="space-y-6">
            {/* Cart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>₹{getTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={orderDetails.paymentMethod}
                    onValueChange={(value) => setOrderDetails({ ...orderDetails, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online Payment</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    value={orderDetails.specialInstructions}
                    onChange={(e) => setOrderDetails({ ...orderDetails, specialInstructions: e.target.value })}
                    placeholder="Any special requests?"
                    rows={2}
                  />
                </div>
                <div className="flex justify-center">
                  <TruckButton 
                    onOrderComplete={handlePlaceOrder}
                    disabled={cart.length === 0 || !orderDetails.name || !orderDetails.phone || !orderDetails.address}
                    buttonText="Place Order"
                    successText="Order Placed"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Delivery in 10 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="history" className="mt-8">
            {pastOrders.length === 0 ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start ordering delicious homemade food and track them here
                  </p>
                  <Button onClick={() => setActiveTab("menu")}>
                    Browse Menu
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {pastOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                          <CardDescription>
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </CardDescription>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Items
                          </h4>
                          <div className="space-y-1">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Delivery Address</p>
                              <p className="text-muted-foreground">{order.delivery_address}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm capitalize">{order.payment_method === 'cash' ? 'Cash on Delivery' : order.payment_method.toUpperCase()}</span>
                          </div>
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <div className="flex items-center gap-2 text-primary">
                              <Truck className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Estimated delivery: {new Date(order.estimated_delivery_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center">
                          <span className="text-lg font-bold">Total: ₹{order.total_amount}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;