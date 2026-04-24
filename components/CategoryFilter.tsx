import { getAllCategories } from "@/lib/actions/productAction";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  category: string;
  getFilterURL: (params: { c?: string }) => string;
}

const CategoryFilter = async ({ category, getFilterURL }: Props) => {
  const categories = await getAllCategories();

  return (
    <>
      <div className="text-lg mb-2 mt-4">
        <span>Categories</span>
      </div>

      <div className="text-sm">
        <ul className="space-y-2">
          <li>
            <Link
              href={getFilterURL({ c: "all" })}
              className={cn(
                (category === "all" || category === "") && "font-bold",
              )}
            >
              All
            </Link>
          </li>

          {categories.map((x) => (
            <li key={x.category}>
              <Link
                href={getFilterURL({ c: x.category })}
                className={cn(category === x.category && "font-bold")}
              >
                {x.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryFilter;
