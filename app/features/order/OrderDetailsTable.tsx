"use client";

import { Order } from "@/types";
import { formatDateTime, formatUUID } from "@/lib/utils";

import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import PaymentMethodCard from "./PaymentMethodCard";
import ShippingAddressCard from "./ShippingAddressCard";
import OrderItemsCard from "./OrderItemsCard";
import OrderItemsPriceDetailCard from "./OrderItemsPriceDetailCard";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  createPayPalOrder,
  approvePayPalOrder,
} from "@/lib/actions/orderAction";
import PayPalPaymentForm from "./PayPalPaymentForm";

interface OrderDetailsTableProps {
  order: Order;
  paypalClientId: string;
}

const OrderDetailsTable = ({
  order,
  paypalClientId,
}: OrderDetailsTableProps) => {
  const {
    id,
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order;

  return (
    <>
      <Heading text={`Order ${formatUUID(id)}`} />

      <div className="grid md:grid-cols-3 md:gap-4">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          {/* Payment Method Card */}
          <PaymentMethodCard paymentMethod={paymentMethod}>
            {isPaid ? (
              <Badge variant={"secondary"}>
                Paid at {formatDateTime(paidAt!).dateTime}
              </Badge>
            ) : (
              <Badge variant={"destructive"}>Not paid</Badge>
            )}
          </PaymentMethodCard>

          {/* Shipping Address Card */}
          <ShippingAddressCard userAddress={shippingAddress}>
            {isDelivered ? (
              <Badge variant={"secondary"}>
                Delivered at {formatDateTime(deliveredAt!).dateTime}
              </Badge>
            ) : (
              <Badge variant={"destructive"}>Not delivered</Badge>
            )}
          </ShippingAddressCard>

          {/* Order Items Card */}
          <OrderItemsCard items={orderItems} />
        </div>

        <div>
          <OrderItemsPriceDetailCard
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
          >
            {/* Paypal Payment */}
            {!isPaid && paymentMethod === "paypal" && (
              <PayPalPaymentForm
                paypalClientId={paypalClientId}
                order={order}
              />
            )}
          </OrderItemsPriceDetailCard>
        </div>
      </div>
    </>
  );
};
export default OrderDetailsTable;
