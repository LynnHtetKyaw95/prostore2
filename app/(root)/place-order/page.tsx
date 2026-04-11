import CartTable from "@/app/features/cart/CartTable";
import CheckOutSteps from "@/components/CheckOutSteps";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/lib/actions/cartAction";
import { getUser, getUserById } from "@/lib/actions/userAction";
import { formatCurrency } from "@/lib/utils";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();

  const userId = await getUser();
  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  if (!user.address) {
    redirect("/shipping-address");
  }

  if (!user.paymentMethod) {
    redirect("/payment-method");
  }

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckOutSteps current={3} />
      <Heading text="Place Order" />

      <div className="grid md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card className="mt-4">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p className="mt-1">
                {userAddress.streetAddress}, {userAddress.city}{" "}
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div className="mt-4">
                <Link href="/shipping-address">
                  <Button variant={"outline"}>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{user.paymentMethod.toUpperCase()}</p>
              <div className="mt-4">
                <Link href="/payment-method">
                  <Button variant={"outline"}>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <p>Items</p>
                <p>{formatCurrency(cart.itemsPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>{formatCurrency(cart.taxPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{formatCurrency(cart.shippingPrice)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-semibold">
                  {formatCurrency(cart.totalPrice)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
