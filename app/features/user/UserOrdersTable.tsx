/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatUUID } from "@/lib/utils";
import Link from "next/link";

const UserOrdersTable = ({ orders }: { orders: any }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>PAID</TableHead>
          <TableHead>DELIVERED</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order: any) => (
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
              <Link href={`/order/${order.id}`}>
                <span className="px-2 hover:text-primary transition-all duration-300">
                  Details
                </span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserOrdersTable;
