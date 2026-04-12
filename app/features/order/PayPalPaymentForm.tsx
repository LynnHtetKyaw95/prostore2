import {
  approvePayPalOrder,
  createPayPalOrder,
} from "@/lib/actions/orderAction";
import { Order } from "@/types";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { toast } from "sonner";

interface PayPalPaymentFormProps {
  order: Order;
  paypalClientId: string;
}

const PrintLoadingState = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  let status = "";

  if (isPending) {
    status = "Loading PayPal...";
  } else if (isRejected) {
    status = "Error Loading PayPal";
  }

  return status;
};

const PayPalPaymentForm = ({
  paypalClientId,
  order,
}: PayPalPaymentFormProps) => {
  async function handleCreatePayPalOrder() {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast.error(res.message);
    }

    return res.data;
  }

  async function handleApprovePayPalOrder(data: { orderID: string }) {
    const res = await approvePayPalOrder(order.id, data);

    toast[res.success ? "success" : "error"](res.message);
  }

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <PrintLoadingState />
      <PayPalButtons
        createOrder={handleCreatePayPalOrder}
        onApprove={handleApprovePayPalOrder}
      />
    </PayPalScriptProvider>
  );
};
export default PayPalPaymentForm;
