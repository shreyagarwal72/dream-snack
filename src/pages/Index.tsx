import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import DeliveryAreas from "@/components/DeliveryAreas";
import DeliveryBanner from "@/components/DeliveryBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dream Snack - Fresh Homemade Food Delivered in 10 Minutes</title>
        <meta name="description" content="Order fresh homemade tea, coffee, snacks, and sweets delivered to your door in just 10 minutes. Quality homemade products made with love." />
        <meta name="keywords" content="homemade food delivery, fresh tea, homemade coffee, snacks delivery, fast food delivery, 10 minute delivery" />
        <meta property="og:title" content="Dream Snack - Fresh Homemade Food Delivered in 10 Minutes" />
        <meta property="og:description" content="Order fresh homemade tea, coffee, snacks, and sweets delivered to your door in just 10 minutes." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dreamsnack.com/" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
        <DeliveryAreas />
        <DeliveryBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;