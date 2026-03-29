import ProductList from "../features/products/ProductList";
import { Suspense } from "react";

export const revalidate = 60;

const HomePage = () => {
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>

      <h2 className="h2-bold">Newest Arrivals</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default HomePage;
