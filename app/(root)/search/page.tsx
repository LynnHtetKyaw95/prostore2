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

interface getFilterURLProps {
  c?: string;
  s?: string;
  p?: string;
  r?: string;
  pg?: string;
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

  // Construct filter URL
  function getFilterURL({ c, s, p, r, pg }: getFilterURLProps) {
    const params = { q, category, price, rating, sort, page: String(page) };

    if (c) {
      params.category = c;
    }
    if (s) {
      params.sort = s;
    }
    if (p) {
      params.price = p;
    }
    if (r) {
      params.rating = r;
    }
    if (pg) {
      params.page = pg;
    }

    return `/search?${new URLSearchParams(params).toString()}`;
  }

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
