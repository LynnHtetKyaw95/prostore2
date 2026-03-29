import { getLatestProducts } from "@/lib/actions/productAction";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className="my-10">
      {latestProducts.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestProducts.map((product: any) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
};
export default ProductList;
