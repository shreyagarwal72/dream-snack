import { Timer, CheckCircle, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "7 Minute Delivery",
    description: "Lightning fast delivery to your doorstep",
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "100% fresh homemade products",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Contactless delivery with safety protocols",
  },
  {
    icon: Truck,
    title: "Track Your Order",
    description: "Real-time tracking from store to door",
  },
];

const DeliveryBanner = () => {
  return (
    <section className="py-16 gradient-hero relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,.1) 10px,
            rgba(255,255,255,.1) 20px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Why Choose Dream Snack?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Experience the taste of homemade goodness with our lightning-fast delivery service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-4 group hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryBanner;