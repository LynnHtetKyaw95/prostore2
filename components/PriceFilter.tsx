import { cn } from "@/lib/utils";
import Link from "next/link";

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
  { name: "$201 to $500", value: "201-500" },
  { name: "$501 to $1000", value: "501-1000" },
];

interface Props {
  price: string;
  getFilterURL: (params: { p?: string }) => string;
}

const PriceFilter = async ({ price, getFilterURL }: Props) => {
  return (
    <>
      <div className="text-lg mb-2 mt-8">
        <p>Price</p>
      </div>

      <div className="text-sm">
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
      </div>
    </>
  );
};
export default PriceFilter;
