import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useGlass } from "@/contexts/GlassContext";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({ name, category, price, image, rating, isNew, isBestseller }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { glassEnabled } = useGlass();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart`,
    });
    navigate("/orders");
  };

  const cardClasses = glassEnabled
    ? "group relative overflow-hidden glass-product glass-hover-lift animate-fade-in"
    : "group relative overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-large";

  const buttonClasses = glassEnabled
    ? "glass-button glass-ripple gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
    : "gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300";

  const badgeClasses = glassEnabled ? "glass-badge" : "";

  return (
    <Card className={cardClasses}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {isNew && (
          <Badge className={`bg-accent text-accent-foreground ${badgeClasses} ${glassEnabled ? 'animate-scale-in' : ''}`}>
            New
          </Badge>
        )}
        {isBestseller && (
          <Badge className={`gradient-primary text-primary-foreground ${badgeClasses} ${glassEnabled ? 'animate-scale-in' : ''}`}>
            Bestseller
          </Badge>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={`${name} - Homemade Non-Chemical ${category}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${glassEnabled ? 'group-hover:scale-105' : 'group-hover:scale-110'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        {glassEnabled && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 transition-all duration-300 ${i < rating ? 'fill-accent text-accent' : 'text-muted'} ${glassEnabled && i < rating ? 'animate-scale-in' : ''}`}
              style={glassEnabled ? { animationDelay: `${i * 50}ms` } : undefined}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({rating}.0)</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-2xl font-bold text-primary ${glassEnabled ? 'animate-fade-in' : ''}`}>₹{price}</span>
          </div>
          <Button 
            size="icon"
            onClick={handleAddToCart}
            className={buttonClasses}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {!glassEnabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </Card>
  );
};

export default ProductCard;