import OrderItemsCard from "@/app/features/order/OrderItemsCard";
import OrderItemsPriceDetailCard from "@/app/features/order/OrderItemsPriceDetailCard";
import PaymentMethodCard from "@/app/features/order/PaymentMethodCard";
import PlaceOrderForm from "@/app/features/order/PlaceOrderForm";
import ShippingAddressCard from "@/app/features/order/ShippingAddressCard";
import CheckOutSteps from "@/components/CheckOutSteps";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";

import { getMyCart } from "@/lib/actions/cartAction";
import { getUser, getUserById } from "@/lib/actions/userAction";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
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
          {/* Shipping Address Card */}
          <ShippingAddressCard userAddress={userAddress}>
            <div className="mt-4">
              <Link href="/shipping-address">
                <Button variant={"outline"}>Edit</Button>
              </Link>
            </div>
          </ShippingAddressCard>

          {/* Payment Method */}
          <PaymentMethodCard paymentMethod={user.paymentMethod}>
            <div className="mt-4">
              <Link href="/payment-method">
                <Button variant={"outline"}>Edit</Button>
              </Link>
            </div>
          </PaymentMethodCard>

          <OrderItemsCard items={cart.items} />
        </div>

        <div>
          <OrderItemsPriceDetailCard
            itemsPrice={cart.itemsPrice}
            taxPrice={cart.taxPrice}
            shippingPrice={cart.shippingPrice}
            totalPrice={cart.totalPrice}
          >
            <PlaceOrderForm />
          </OrderItemsPriceDetailCard>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
