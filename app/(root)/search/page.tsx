import ProductCard from "@/app/features/products/ProductCard";
import { getAllProducts } from "@/lib/actions/productAction";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}

const SearchPage = async (props: SearchPageProps) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = 1,
  } = await props.searchParams;

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-6">
      <div className="filter-links">{/* FILTERS */}</div>

      <div className="space-y-4 md:col-span-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {!products.data.length && <p>No products found</p>}

          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
