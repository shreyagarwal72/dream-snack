import ProductCard from "./ProductCard";
import indianTea from "@/assets/indian-tea.jpg";
import indianCoffee from "@/assets/indian-coffee.jpg";
import indianCorn from "@/assets/indian-corn.jpg";
import indianSnacks from "@/assets/indian-snacks.jpg";

const products = [
  {
    id: 1,
    name: "Homemade Tea",
    category: "Tea",
    price: 10,
    image: indianTea,
    rating: 5,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Fresh Coffee",
    category: "Coffee",
    price: 10,
    image: indianCoffee,
    rating: 5,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Sweet Corn",
    category: "Snacks",
    price: 50,
    image: indianCorn,
    rating: 4,
  },
  {
    id: 4,
    name: "Mixed Snacks Combo",
    category: "Mixed Products",
    price: 50,
    image: indianSnacks,
    rating: 5,
    isNew: true,
  },
];

const ProductGrid = () => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Homemade Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Freshly prepared at home with love and care - delivered to your door in just 7 minutes
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