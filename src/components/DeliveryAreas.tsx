import { MapPin, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGlass } from "@/contexts/GlassContext";

const deliveryAreas = [
  "Kamla Nagar",
  "Balkeshwar",
  "Adarsh Nagar",
  "Karmyogi"
];

const DeliveryAreas = () => {
  const { glassEnabled } = useGlass();

  return (
    <section id="delivery-areas" className={`py-16 ${glassEnabled ? 'bg-transparent' : 'bg-gradient-warm dark:bg-background'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-primary dark:to-accent">
              Delivery Areas
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We currently deliver our homemade Non-Chemical delights to select areas with our signature 10-minute service
          </p>
        </div>

        <Card className={`max-w-3xl mx-auto p-8 border-accent/20 ${
          glassEnabled 
            ? 'glass-card animate-glass-breathe' 
            : 'gradient-card dark:bg-card dark:border-border'
        }`}>
          <div className="flex items-center justify-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              glassEnabled 
                ? 'glass-button animate-glow-pulse' 
                : 'gradient-primary'
            }`}>
              <MapPin className={`w-8 h-8 ${glassEnabled ? 'text-primary' : 'text-primary-foreground'}`} />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-center mb-6 text-foreground">
            Available in Your Area
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliveryAreas.map((area, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg animate-scale-in ${
                  glassEnabled 
                    ? 'glass-button' 
                    : 'bg-background/50 dark:bg-muted/30'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">{area}</span>
              </div>
            ))}
          </div>
          <div className={`mt-6 p-4 rounded-lg ${
            glassEnabled 
              ? 'glass-button' 
              : 'bg-accent/10 dark:bg-accent/5'
          }`}>
            <p className="text-sm text-muted-foreground text-center mb-2">
              <strong className="text-foreground">Service Hours:</strong> 6:00 AM - 9:00 PM | Open 7 Days a Week
            </p>
            <p className="text-sm text-muted-foreground text-center">
              More areas coming soon! Stay tuned for expansion updates.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DeliveryAreas;