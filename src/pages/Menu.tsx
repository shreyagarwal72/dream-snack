import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Cookie, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const menuData = {
  beverages: [
    { id: 1, name: "Indian Chai", price: 15, description: "Traditional homemade tea with aromatic spices", popular: true },
    { id: 2, name: "Cappuccino", price: 20, description: "Fresh coffee with creamy milk foam", popular: true },
    { id: 3, name: "Green Tea", price: 15, description: "Healthy herbal tea with antioxidants" },
    { id: 4, name: "Black Coffee", price: 18, description: "Strong black coffee for coffee lovers" },
    { id: 5, name: "Masala Chai", price: 18, description: "Special spiced tea with ginger and cardamom" },
    { id: 6, name: "Lemon Tea", price: 15, description: "Refreshing tea with fresh lemon" },
    { id: 7, name: "Hot Chocolate", price: 25, description: "Rich and creamy chocolate drink" },
    { id: 8, name: "Cold Coffee", price: 25, description: "Chilled coffee with ice cream", popular: true },
  ],
  snacks: [
    { id: 9, name: "Corn Snacks Mix", price: 25, description: "Crispy corn mixture with spices", popular: true },
    { id: 10, name: "Mixed Namkeen", price: 30, description: "Traditional Indian savory snacks mix" },
    { id: 11, name: "Sweet Corn", price: 20, description: "Boiled sweet corn with butter and spices" },
    { id: 12, name: "Popcorn", price: 15, description: "Fresh homemade buttery popcorn" },
    { id: 13, name: "Samosa", price: 20, description: "Crispy fried pastry with spiced potato filling", popular: true },
    { id: 14, name: "Kachori", price: 20, description: "Deep-fried snack with lentil filling" },
    { id: 15, name: "Dhokla", price: 25, description: "Steamed savory cake made from gram flour" },
    { id: 16, name: "Vada Pav", price: 25, description: "Mumbai's famous potato fritter sandwich" },
  ],
  sweets: [
    { id: 17, name: "Gulab Jamun", price: 30, description: "Soft milk dumplings in sugar syrup", popular: true },
    { id: 18, name: "Rasgulla", price: 25, description: "Spongy cottage cheese balls in syrup" },
    { id: 19, name: "Jalebi", price: 25, description: "Crispy spiral sweet soaked in syrup" },
    { id: 20, name: "Ladoo", price: 20, description: "Traditional round sweet balls" },
    { id: 21, name: "Barfi", price: 30, description: "Sweet condensed milk fudge" },
    { id: 22, name: "Halwa", price: 25, description: "Traditional sweet pudding" },
  ],
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("beverages");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Menu - Dream Snack | Homemade Beverages, Snacks & Sweets</title>
        <meta name="description" content="Browse our menu of fresh homemade tea, coffee, snacks, and sweets. All products made with love and care at home. Fast 10-minute delivery." />
        <meta name="keywords" content="homemade menu, tea menu, coffee menu, snacks menu, Indian sweets, beverages, food delivery menu" />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground mb-6">
            100% Homemade • Fresh Daily • No Chemicals
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              10 Min Delivery
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Made by Devansh & Shrey
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="beverages" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="beverages" className="gap-2">
              <Coffee className="w-4 h-4" />
              Beverages
            </TabsTrigger>
            <TabsTrigger value="snacks" className="gap-2">
              <Cookie className="w-4 h-4" />
              Snacks
            </TabsTrigger>
            <TabsTrigger value="sweets" className="gap-2">
              <Cookie className="w-4 h-4" />
              Sweets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beverages">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuData.beverages.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      {item.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                      <Badge variant="outline">Per serving</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="snacks">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuData.snacks.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      {item.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                      <Badge variant="outline">Per serving</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sweets">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuData.sweets.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      {item.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                      <Badge variant="outline">Per serving</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
              <p className="text-muted-foreground mb-6">
                Get your favorite homemade food delivered in just 10 minutes!
              </p>
              <Link to="/orders">
                <Button size="lg" className="gap-2">
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;