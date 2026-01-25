import { ShoppingCart, Clock, Menu, Home, Package, MapPin, HelpCircle, LogIn, Settings, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useGlass } from "@/contexts/GlassContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const { glassEnabled } = useGlass();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogoClick = () => {
    navigate('/intro');
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const headerClasses = glassEnabled
    ? "sticky top-0 z-50 glass-header transition-all duration-500"
    : "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300";

  const navLinkClasses = glassEnabled
    ? "glass-nav-link text-foreground/80 hover:text-foreground transition-colors"
    : "text-foreground/80 hover:text-foreground transition-colors";

  const badgeClasses = glassEnabled
    ? "glass-badge"
    : "";

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div 
            className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${glassEnabled ? 'hover:scale-105' : 'hover:opacity-80'}`}
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <img 
              src={logo} 
              alt="Dream Snack Logo" 
              className={`w-10 h-10 rounded-lg transition-all duration-300 ${glassEnabled ? 'animate-subtle-float' : ''}`} 
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dream Snack
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">10 Min Delivery</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/menu" className={navLinkClasses}>
              Menu
            </Link>
            <a href="#delivery-areas" className={navLinkClasses}>
              Delivery Areas
            </a>
            {user && (
              <Link to="/orders" className={navLinkClasses}>
                Orders
              </Link>
            )}
            <Link to="/help" className={navLinkClasses}>
              Help
            </Link>
            {user && (
              <Link to="/settings" className={navLinkClasses}>
                Settings
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className={`hidden sm:flex items-center gap-1 px-3 py-1 ${badgeClasses} ${glassEnabled ? 'animate-fade-in' : ''}`}>
            <Clock className="w-3 h-3" />
            <span className="font-semibold">10 Min Delivery</span>
          </Badge>
          
          <Badge className={`hidden md:flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30 ${badgeClasses}`}>
            <span className="text-xs font-medium">6 AM - 9 PM</span>
          </Badge>

          
          {user ? (
            <Link to="/settings">
              <Button variant="ghost" size="icon" className={`hidden sm:flex ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.user_metadata?.display_name ? getInitials(user.user_metadata.display_name) : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="default" className={`hidden sm:flex ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                Login
              </Button>
            </Link>
          )}
          
          <Button variant="outline" size="icon" className={`relative ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
            <ShoppingCart className="w-5 h-5" />
            <span className={`absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center ${glassEnabled ? 'animate-scale-in' : ''}`}>
              0
            </span>
          </Button>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`w-[300px] sm:w-[400px] ${glassEnabled ? 'glass-sheet' : ''}`}>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src={logo} alt="Dream Snack" className="w-8 h-8 rounded-lg" />
                  Dream Snack
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col gap-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                    <Home className="w-4 h-4" />
                    Home
                  </Button>
                </Link>
                
                <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                    <Package className="w-4 h-4" />
                    Menu
                  </Button>
                </Link>
                
                <Link to="/checkout" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                    <ShoppingCart className="w-4 h-4" />
                    Checkout
                  </Button>
                </Link>
                
                <a href="#delivery-areas" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                    <MapPin className="w-4 h-4" />
                    Delivery Areas
                  </Button>
                </a>
                
                {user && (
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                      <ShoppingBag className="w-4 h-4" />
                      Orders
                    </Button>
                  </Link>
                )}
                
                <Link to="/help" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                    <HelpCircle className="w-4 h-4" />
                    Help
                  </Button>
                </Link>
                
                {user && (
                  <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className={`w-full justify-start gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                  </Link>
                )}
                
                <div className="border-t pt-4 mt-4">
                  {user ? (
                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className={`w-full gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {user.user_metadata?.display_name ? getInitials(user.user_metadata.display_name) : <User className="w-3 h-3" />}
                          </AvatarFallback>
                        </Avatar>
                        My Account
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button className={`w-full gap-2 ${glassEnabled ? 'glass-button glass-ripple' : ''}`}>
                        <LogIn className="w-4 h-4" />
                        Login / Sign Up
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className={`w-full justify-center py-2 ${badgeClasses}`}>
                    <Clock className="w-3 h-3 mr-2" />
                    10 Min Delivery
                  </Badge>
                  <Badge className={`w-full justify-center py-2 bg-accent/20 text-accent-foreground border-accent/30 ${badgeClasses}`}>
                    6 AM - 9 PM
                  </Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;