import { Card, CardContent } from "@/components/ui/card";
import { ShippingAddress } from "@/types";

interface ShippingAddressCardProps {
  userAddress: ShippingAddress;
  children: React.ReactNode;
}

const ShippingAddressCard = ({
  children,
  userAddress,
}: ShippingAddressCardProps) => {
  return (
    <Card className="mt-4">
      <CardContent className="p-4 gap-4">
        <h2 className="text-xl pb-4">Shipping Address</h2>
        <p className="font-semibold">{userAddress.fullName}</p>
        <p className="mt-1 text-muted-foreground">
          {userAddress.streetAddress}, {userAddress.city}{" "}
          {userAddress.postalCode}, {userAddress.country}
        </p>

        <div className="mt-2">{children}</div>
      </CardContent>
    </Card>
  );
};
export default ShippingAddressCard;
