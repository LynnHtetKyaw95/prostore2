import { cn } from "@/lib/utils";
import Link from "next/link";

const ratings = [4, 3, 2, 1];

interface Props {
  rating: string;
  getFilterURL: (params: { r?: string }) => string;
}

const RatingFilter = ({ rating, getFilterURL }: Props) => {
  return (
    <>
      <div className="text-lg mb-2 mt-8">
        <p>Rating</p>
      </div>

      <div className="text-sm">
        <ul className="space-y-2">
          <li>
            <Link
              href={getFilterURL({ r: "all" })}
              className={cn(rating === "all" && "font-bold")}
            >
              All
            </Link>
          </li>

          {ratings.map((r) => (
            <li key={r}>
              <Link
                href={getFilterURL({ r: `${r}` })}
                className={cn(rating === r.toString() && "font-bold")}
              >
                {`${r} stars & up`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default RatingFilter;
