import Charts from "@/app/features/admin/Charts";
import OverviewCard from "@/app/features/admin/OverviewCard";
import RecentSales from "@/app/features/admin/RecentSales";
import { auth } from "@/auth";
import Heading from "@/components/Heading";
import { getOrderSummary } from "@/lib/actions/orderAction";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BadgeDollarSign, Barcode, CreditCard, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverViewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }

  const summary = await getOrderSummary();

  return (
    <div className="space-y-2">
      <Heading text="Dashboard" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Total Revenue" icon={BadgeDollarSign}>
          {formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}
        </OverviewCard>

        <OverviewCard title="Sales" icon={CreditCard}>
          {formatNumber(summary.ordersCount)}
        </OverviewCard>

        <OverviewCard title="Customers" icon={User}>
          {formatNumber(summary.usersCount)}
        </OverviewCard>

        <OverviewCard title="Products" icon={Barcode}>
          {formatNumber(summary.productsCount)}
        </OverviewCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <OverviewCard className="col-span-7" title="Overview">
          <Charts data={{ salesData: summary.salesData }} />
        </OverviewCard>

        <OverviewCard className="col-span-5" title="Recent Sales">
          <RecentSales />
        </OverviewCard>
      </div>
    </div>
  );
};
export default AdminOverViewPage;
