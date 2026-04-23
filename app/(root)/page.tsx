import Heading from "@/components/Heading";
import ProductList from "../features/products/ProductList";
import { Suspense } from "react";
import ProductCarousel from "../features/products/ProductCarousel";

export const revalidate = 60;

const HomePage = () => {
  return (
    <div className="space-y-8">
      <ProductCarousel />
      <Heading text="Newest Arrivals" />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default HomePage;
