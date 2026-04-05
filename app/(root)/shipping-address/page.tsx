import ShippingAddressForm from "@/app/features/shipping/ShippingAddressForm";
import { getMyCart } from "@/lib/actions/cartAction";
import { getUser, getUserById } from "@/lib/actions/userAction";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const userId = await getUser();

  if (!userId) {
    throw new Error("No user Id");
  }

  const user = await getUserById(userId);

  return (
    <>
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};
export default ShippingAddressPage;
