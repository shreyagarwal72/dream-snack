import { Clock, Info } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useGlass } from "@/contexts/GlassContext";

const Footer = () => {
  const { glassEnabled } = useGlass();

  const footerClasses = glassEnabled
    ? "glass-footer mt-16 animate-fade-in"
    : "bg-card border-t mt-16";

  const linkClasses = glassEnabled
    ? "glass-nav-link text-muted-foreground hover:text-foreground transition-colors"
    : "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className={glassEnabled ? "animate-fade-in" : ""}>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Dream Snack Logo" 
                className={`w-10 h-10 rounded-lg ${glassEnabled ? 'animate-subtle-float' : ''}`} 
              />
              <h3 className="text-xl font-bold">Dream Snack</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Your favorite homemade snacks and beverages delivered in just 10 minutes. Made with love, delivered with care. Open 6 AM - 9 PM daily.
            </p>
            <div className={`inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20 mt-3 ${glassEnabled ? 'glass-badge' : ''}`}>
              <Info className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-sm font-medium text-foreground">
                Homemade means Non-Chemical
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={glassEnabled ? "animate-fade-in" : ""} style={glassEnabled ? { animationDelay: '100ms' } : undefined}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#products" className={linkClasses}>
                  Products
                </a>
              </li>
              <li>
                <a href="#categories" className={linkClasses}>
                  Categories
                </a>
              </li>
              <li>
                <a href="https://vanshubhai.vercel.app" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#delivery-areas" className={linkClasses}>
                  Delivery Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className={glassEnabled ? "animate-fade-in" : ""} style={glassEnabled ? { animationDelay: '200ms' } : undefined}>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className={linkClasses}>
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className={linkClasses}>
                  Delivery Info
                </a>
              </li>
              <li>
                <a href="#" className={linkClasses}>
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className={linkClasses}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className={glassEnabled ? "animate-fade-in" : ""} style={glassEnabled ? { animationDelay: '300ms' } : undefined}>
            <h4 className="font-semibold mb-4">Service Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className={`flex items-center gap-2 text-muted-foreground ${glassEnabled ? 'glass-badge px-3 py-2 rounded-lg' : ''}`}>
                <Clock className="w-4 h-4" />
                <span>6:00 AM - 9:00 PM (7 Days)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t mt-8 pt-8 text-center text-sm text-muted-foreground ${glassEnabled ? 'animate-fade-in' : ''}`} style={glassEnabled ? { animationDelay: '400ms' } : undefined}>
          <p className="mb-2">&copy; 2024 Dream Snack. All rights reserved. | Homemade with Love - 10 Minute Delivery Service</p>
          <p className="text-xs">
            <span className="font-semibold">Created by:</span> Devansh & Shrey
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;