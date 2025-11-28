import { Coffee, Leaf, Candy, Package } from "lucide-react";

const categories = [
  {
    icon: Leaf,
    name: "Homemade Tea",
    count: "₹15 per cup",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Coffee,
    name: "Fresh Coffee",
    count: "₹20 per cup",
    color: "from-amber-600 to-amber-700",
  },
  {
    icon: Candy,
    name: "Snacks",
    count: "₹50 per pack",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Package,
    name: "Mixed Combos",
    count: "₹50 per combo",
    color: "from-blue-500 to-blue-600",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="section-padding bg-gradient-warm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our homemade Non-Chemical selection of beverages and snacks - all made fresh at home
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 rounded-2xl bg-card hover:shadow-large transition-all duration-300 card-lift">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;