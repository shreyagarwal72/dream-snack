import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

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
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-large">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {isNew && (
          <Badge className="bg-accent text-accent-foreground">
            New
          </Badge>
        )}
        {isBestseller && (
          <Badge className="gradient-primary text-primary-foreground">
            Bestseller
          </Badge>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className={`w-4 h-4 ${i < rating ? 'fill-accent text-accent' : 'text-muted'}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({rating}.0)</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{price}</span>
            <span className="text-sm text-muted-foreground ml-2 line-through">₹{Math.round(price * 1.2)}</span>
          </div>
          <Button 
            size="icon" 
            className="gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};

export default ProductCard;