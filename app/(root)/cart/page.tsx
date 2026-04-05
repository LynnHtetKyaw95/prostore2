import CartTable from "@/app/features/cart/CartTable";
import { getMyCart } from "@/lib/actions/cartAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
