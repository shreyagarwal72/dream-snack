import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, Truck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-delivery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Dream Snack - Fast 10 minute homemade food delivery service" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">100% Homemade by Devansh & Shrey</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Dream Snack
            </span>
            <br />
            <span className="text-foreground">10 Min Delivery</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            Fresh homemade tea, coffee, and delicious snacks delivered to your doorstep in just 10 minutes. 
            Everything made at home with care and quality ingredients. Open daily 6 AM - 9 PM.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link to="/orders">
              <Button size="lg" className="gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 group">
                Order Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline" className="backdrop-blur-sm">
                View Menu
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-accent" />
              <span className="font-medium">10 Min Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-accent" />
              <span className="font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-medium">100% Homemade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;