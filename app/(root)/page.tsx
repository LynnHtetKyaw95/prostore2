import Heading from "@/components/Heading";
import ProductList from "../features/products/ProductList";
import { Suspense } from "react";
import ProductCarousel from "../features/products/ProductCarousel";
import ViewAllProductsBtn from "@/components/ViewAllProductsBtn";

export const revalidate = 60;

const HomePage = () => {
  return (
    <div className="space-y-8">
      <ProductCarousel />
      <Heading text="Newest Arrivals" />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList />
      </Suspense>

      <ViewAllProductsBtn />
    </div>
  );
};

export default HomePage;
