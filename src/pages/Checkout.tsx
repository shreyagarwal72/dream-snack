import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, Smartphone, Wallet, ShieldCheck, Truck, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  // Demo cart items
  const cartItems = [
    { id: 1, name: 'Homemade Tea', price: 15, quantity: 2, image: '/placeholder.svg' },
    { id: 2, name: 'Sweet Corn', price: 50, quantity: 1, image: '/placeholder.svg' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    setStep('confirmation');
    toast({
      title: "Order Placed Successfully!",
      description: "Your order will be delivered in 10 minutes",
    });
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Order Confirmed - Dream Snack</title>
          <meta name="description" content="Your order has been confirmed and will be delivered soon" />
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your order. Your delicious homemade food is on its way!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <p className="font-semibold">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">10 minutes</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <p className="font-semibold">Order ID</p>
                  <p className="text-sm text-muted-foreground">#DS{Math.floor(Math.random() * 10000)}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Wallet className="h-8 w-8 text-primary mb-2" />
                  <p className="font-semibold">Payment</p>
                  <p className="text-sm text-muted-foreground capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm mb-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button onClick={() => window.location.href = '/'} className="w-full">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout - Dream Snack | Fast Homemade Food Delivery</title>
        <meta name="description" content="Complete your order for fresh homemade food. Multiple payment options including COD, UPI, and Card. Fast 10-minute delivery." />
        <meta name="keywords" content="checkout, payment, homemade food delivery, order food online, COD, UPI payment" />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout - Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>Where should we deliver your order?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="House no., Street, Area"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="110001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                      </div>
                    </Label>
                    <Badge variant="secondary">Popular</Badge>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5" />
                      <div>
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* UPI Details */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-2 mt-4 p-4 bg-muted rounded-lg">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      placeholder="yourname@upi"
                      value={formData.upiId}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Demo: Enter any UPI ID format (e.g., user@paytm)
                    </p>
                  </div>
                )}

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4 p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="password"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Demo: Use any card number format (e.g., 4111 1111 1111 1111)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-4 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p>Your payment information is secure and encrypted. This is a demo checkout.</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍵</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                  Place Order (Demo)
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>✓ Free delivery on orders above ₹200</p>
                  <p>✓ Estimated delivery: 10 minutes</p>
                  <p>✓ Fresh homemade products</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
