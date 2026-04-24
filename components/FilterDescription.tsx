import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  q: string;
  category: string;
  price: string;
  rating: string;
}

const FilterDescription = ({ q, category, price, rating }: Props) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <p>{q !== "all" && q !== "" && `Query: ${q}`}</p>
      <p>{category !== "all" && category !== "" && `Category: ${category}`}</p>
      <p>{price !== "all" && `Price: ${price}`}</p>
      <p>{rating !== "all" && "Rating: " + `${rating} stars & up`}</p>
      &nbsp;
      <p>
        {(q !== "all" && q !== "") ||
        (category !== "all" && q !== "") ||
        price !== "all" ||
        rating !== "all" ? (
          <Button variant={"link"} asChild>
            <Link href={"/search"}>Clear</Link>
          </Button>
        ) : null}
      </p>
    </div>
  );
};

export default FilterDescription;
