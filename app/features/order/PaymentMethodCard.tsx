import { Card, CardContent } from "@/components/ui/card";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PaymentMethodCardProps {
  children: React.ReactNode;
  paymentMethod: any;
}

const PaymentMethodCard = ({
  children,
  paymentMethod,
}: PaymentMethodCardProps) => {
  return (
    <Card className="mt-4">
      <CardContent className="p-4 gap-4">
        <h2 className="text-xl pb-4">Payment Method</h2>
        <p className="capitalize">{paymentMethod}</p>

        <div className="mt-2">{children}</div>
      </CardContent>
    </Card>
  );
};
export default PaymentMethodCard;
