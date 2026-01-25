import { Clock, Info } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dream Snack Logo" className="w-10 h-10 rounded-lg" />
              <h3 className="text-xl font-bold">Dream Snack</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Your favorite homemade snacks and beverages delivered in just 10 minutes. Made with love, delivered with care. Open 6 AM - 9 PM daily.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20 mt-3">
              <Info className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-sm font-medium text-foreground">
                Homemade means Non-Chemical
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="https://vanshubhai.vercel.app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#delivery-areas" className="text-muted-foreground hover:text-foreground transition-colors">
                  Delivery Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Delivery Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Service Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>6:00 AM - 9:00 PM (7 Days)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
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