import sampleData from "@/db/sample-data";
import ProductList from "../features/products/ProductList";
import { Suspense } from "react";

// export const revalidate = 60; // later (SSG + ISR) when fetching data from server

const HomePage = () => {
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>

      <h2 className="h2-bold">Newest Arrivals</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList data={sampleData.products} limit={4} />
      </Suspense>
    </div>
  );
};

export default HomePage;
