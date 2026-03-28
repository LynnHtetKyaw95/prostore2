import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./ProductPrice";

interface ProductCardProps {
  product: any; // later change type
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { slug, images, name, brand, rating, stock, price } = product;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${slug}`}>
          <Image
            priority={true}
            src={images![0]}
            alt={name}
            height={300}
            width={300}
            className="aspect-square object-cover rounded"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{brand}</div>
        <Link href={`/product/${slug}`}>
          <h2 className="text-sm font-medium">{name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{rating} stars</p>

          {stock > 0 ? (
            <ProductPrice value={price} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
