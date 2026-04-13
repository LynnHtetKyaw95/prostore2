import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderSummary } from "@/lib/actions/orderAction";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import Link from "next/link";

const RecentSales = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const summary = await getOrderSummary();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>BUYER</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {summary.latestSales.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              {order?.user?.name ? order.user.name : "Deleted User"}
            </TableCell>
            <TableCell>{formatDateTime(order.createdAt).dateOnly}</TableCell>
            <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
            <TableCell>
              <Link href={`/order/${order.id}`}>
                <span className="px-2 hover:text-primary">Details</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default RecentSales;
