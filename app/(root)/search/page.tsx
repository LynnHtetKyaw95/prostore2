import ProductCard from "@/app/features/products/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import FilterDescription from "@/components/FilterDescription";
import PriceFilter from "@/components/PriceFilter";
import RatingFilter from "@/components/RatingFilter";
import Sorting from "@/components/Sorting";
import { getAllProducts } from "@/lib/actions/productAction";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}

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

export const revalidate = 60;

export async function generateMetadata(props: Props) {
  const {
    q = "all",
    category = "all",
    rating = "all",
    price = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}
      `,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
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
      params.page = "1";
    }
    if (s) {
      params.sort = s;
    }
    if (p) {
      params.price = p;
      params.page = "1";
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
      <div className="filter-links">
        {/* FILTERS */}

        <Suspense fallback={<p>Loading categories...</p>}>
          <CategoryFilter category={category} getFilterURL={getFilterURL} />
        </Suspense>

        <PriceFilter price={price} getFilterURL={getFilterURL} />

        <RatingFilter rating={rating} getFilterURL={getFilterURL} />
      </div>

      <div className="space-y-4 md:col-span-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <FilterDescription
            q={q}
            category={category}
            price={price}
            rating={rating}
          />

          <Sorting sort={sort} getFilterURL={getFilterURL} />
        </div>

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
