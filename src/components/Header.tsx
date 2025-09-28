import { ShoppingCart, Clock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dream Snack
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-foreground/80 hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#categories" className="text-foreground/80 hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#delivery-areas" className="text-foreground/80 hover:text-foreground transition-colors">
              Delivery Areas
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="hidden sm:flex items-center gap-1 px-3 py-1">
            <Clock className="w-3 h-3" />
            <span className="font-semibold">7 Min Delivery</span>
          </Badge>
          
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
              0
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;