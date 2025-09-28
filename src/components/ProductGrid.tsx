import ProductCard from "./ProductCard";
import greenTea from "@/assets/green-tea.jpg";
import coffeeBeans from "@/assets/coffee-beans.jpg";
import sweetcorn from "@/assets/sweetcorn.jpg";
import blackTea from "@/assets/black-tea.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import mixedSnacks from "@/assets/mixed-snacks.jpg";

const products = [
  {
    id: 1,
    name: "Premium Green Tea",
    category: "Tea",
    price: 299,
    image: greenTea,
    rating: 5,
    isNew: true,
  },
  {
    id: 2,
    name: "Artisan Coffee Beans",
    category: "Coffee",
    price: 449,
    image: coffeeBeans,
    rating: 5,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Fresh Sweetcorn",
    category: "Snacks",
    price: 89,
    image: sweetcorn,
    rating: 4,
  },
  {
    id: 4,
    name: "Black Tea Collection",
    category: "Tea",
    price: 349,
    image: blackTea,
    rating: 5,
    isBestseller: true,
  },
  {
    id: 5,
    name: "Instant Cappuccino",
    category: "Coffee",
    price: 199,
    image: cappuccino,
    rating: 4,
    isNew: true,
  },
  {
    id: 6,
    name: "Mixed Healthy Snacks",
    category: "Snacks",
    price: 259,
    image: mixedSnacks,
    rating: 5,
  },
];

const ProductGrid = () => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections delivered fresh to your door in just 7 minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;