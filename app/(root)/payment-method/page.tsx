import PaymentMethodForm from "@/app/features/paymentMethod/PaymentMethodForm";
import CheckOutSteps from "@/components/CheckOutSteps";
import { getUser, getUserById } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const userId = await getUser();

  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};
export default PaymentMethodPage;
