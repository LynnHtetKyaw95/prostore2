import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface OrderItemsPriceDetailCardProps {
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  children?: React.ReactNode;
}

const OrderItemsPriceDetailCard = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  children,
}: OrderItemsPriceDetailCardProps) => {

  return (
    <Card className="mt-4">
      <CardContent className="p-4 gap-4 space-y-4">
        <div className="flex justify-between">
          <p>Items</p>
          <p>{formatCurrency(itemsPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>{formatCurrency(taxPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>{formatCurrency(shippingPrice)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        </div>
      </CardContent>

      {children}
    </Card>
  );
};
export default OrderItemsPriceDetailCard;
