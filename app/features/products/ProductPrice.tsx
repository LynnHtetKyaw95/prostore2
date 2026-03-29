import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  className?: string;
}

const ProductPrice = ({ price, className }: ProductPriceProps) => {
  const priceValue = price.toFixed(2);

  const [intValue, floatValue] = priceValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};
export default ProductPrice;
