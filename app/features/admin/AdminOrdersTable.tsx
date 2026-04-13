import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteOrder, getAllOrders } from "@/lib/actions/orderAction";
import { formatCurrency, formatDateTime, formatUUID } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import DeleteButtonWithDialog from "./DeleteButtonWithDialog";
import DetailsButton from "./DetailsButton";

type OrdersArray = Awaited<ReturnType<typeof getAllOrders>>["data"];

type Props = {
  orders: OrdersArray;
};

const AdminOrdersTable = async ({ orders }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>PAID</TableHead>
          <TableHead>DELIVERED</TableHead>
          <TableHead className="text-center">ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{formatUUID(order.id)}</TableCell>
            <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
            <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
            <TableCell>
              {order.isPaid && order.paidAt ? (
                formatDateTime(order.paidAt).dateTime
              ) : (
                <Badge variant={"destructive"}>
                  <span>Not Paid</span>
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {order.isDelivered && order.deliveredAt ? (
                formatDateTime(order.deliveredAt).dateTime
              ) : (
                <Badge variant={"destructive"}>
                  <span>Not Delivered</span>
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-center">
                <DetailsButton
                  href={`/order/${order.id}`}
                  text="View Order Details"
                />

                <DeleteButtonWithDialog id={order.id} action={deleteOrder} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AdminOrdersTable;
