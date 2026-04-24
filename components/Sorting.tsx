import { cn } from "@/lib/utils";
import Link from "next/link";

// const sortOrders = ["newest", "lowest", "highest", "rating"];

const sortOrders = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Lowest",
    value: "lowest",
  },
  {
    name: "Highest",
    value: "highest",
  },
  {
    name: "Rating",
    value: "rating",
  },
];

interface Props {
  sort: string;
  getFilterURL: (params: { s?: string }) => string;
}

const Sorting = ({ sort, getFilterURL }: Props) => {
  return (
    <>
      <div className="text-sm">
        <p>
          Sorted By:{" "}
          {sortOrders.map((s) => (
            <Link
              key={s.value}
              className={cn("mx-2", sort === s.value && "font-bold")}
              href={getFilterURL({ s: s.value })}
            >
              {s.name}
            </Link>
          ))}
        </p>
      </div>

      {/* <div className="text-sm">
        <ul className="space-y-2">
          <li>
            <Link
              href={getFilterURL({ p: "all" })}
              className={cn(price === "all" && "font-bold")}
            >
              All
            </Link>
          </li>

          {prices.map((p) => (
            <li key={p.value}>
              <Link
                href={getFilterURL({ p: p.value })}
                className={cn(price === p.value && "font-bold")}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Sorting;
