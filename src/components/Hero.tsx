import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, Truck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-delivery.jpg";
import { useGlass } from "@/contexts/GlassContext";

const Hero = () => {
  const { glassEnabled } = useGlass();

  return (
    <section className={`relative min-h-[600px] flex items-center overflow-hidden ${glassEnabled ? 'glass-hero' : ''}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Dream Snack - Fast 10 minute homemade food delivery service" 
          className={`w-full h-full object-cover ${glassEnabled ? 'animate-subtle-float' : ''}`}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        {glassEnabled && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-2xl ${glassEnabled ? 'animate-fade-in' : 'animate-fade-in'}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${glassEnabled ? 'glass-badge animate-scale-in' : 'bg-accent/20 backdrop-blur-sm'}`}>
            <Sparkles className={`w-4 h-4 text-accent ${glassEnabled ? 'animate-pulse-slow' : ''}`} />
            <span className="text-sm font-medium">100% Homemade by Devansh & Shrey</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className={`bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent ${glassEnabled ? 'animate-fade-in' : ''}`}>
              Dream Snack
            </span>
            <br />
            <span className={`text-foreground ${glassEnabled ? 'animate-fade-in' : ''}`} style={glassEnabled ? { animationDelay: '200ms' } : undefined}>10 Min Delivery</span>
          </h1>
          
          <p className={`text-xl text-muted-foreground mb-4 ${glassEnabled ? 'animate-fade-in' : ''}`} style={glassEnabled ? { animationDelay: '300ms' } : undefined}>
            Fresh homemade tea, coffee, and delicious snacks delivered to your doorstep in just 10 minutes. 
            Everything made at home with care and quality ingredients. Open daily 6 AM - 9 PM.
          </p>

          <div className={`flex flex-wrap gap-4 mb-8 ${glassEnabled ? 'animate-fade-in' : ''}`} style={glassEnabled ? { animationDelay: '400ms' } : undefined}>
            <Link to="/orders">
              <Button 
                size="lg" 
                className={`gradient-primary text-primary-foreground transition-all duration-300 group ${glassEnabled ? 'glass-ripple hover:shadow-glow animate-glow-pulse' : 'hover:shadow-glow'}`}
              >
                Order Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                size="lg" 
                variant="outline" 
                className={glassEnabled ? 'glass-button glass-ripple' : 'backdrop-blur-sm'}
              >
                View Menu
              </Button>
            </Link>
          </div>

          <div className={`flex flex-wrap gap-6 text-sm ${glassEnabled ? 'animate-fade-in' : ''}`} style={glassEnabled ? { animationDelay: '500ms' } : undefined}>
            <div className={`flex items-center gap-2 ${glassEnabled ? 'glass-badge px-3 py-2 rounded-lg' : ''}`}>
              <Timer className={`w-5 h-5 text-accent ${glassEnabled ? 'animate-pulse-slow' : ''}`} />
              <span className="font-medium">10 Min Delivery</span>
            </div>
            <div className={`flex items-center gap-2 ${glassEnabled ? 'glass-badge px-3 py-2 rounded-lg' : ''}`}>
              <Truck className={`w-5 h-5 text-accent ${glassEnabled ? 'animate-pulse-slow' : ''}`} />
              <span className="font-medium">Free Delivery</span>
            </div>
            <div className={`flex items-center gap-2 ${glassEnabled ? 'glass-badge px-3 py-2 rounded-lg' : ''}`}>
              <Sparkles className={`w-5 h-5 text-accent ${glassEnabled ? 'animate-pulse-slow' : ''}`} />
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