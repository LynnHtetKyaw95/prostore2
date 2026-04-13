import Charts from "@/app/features/admin/Charts";
import OverviewCard from "@/app/features/admin/OverviewCard";
import RecentSales from "@/app/features/admin/RecentSales";
import Heading from "@/components/Heading";
import { getOrderSummary } from "@/lib/actions/orderAction";
import { requireAdmin } from "@/lib/actions/userAction";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BadgeDollarSign, Barcode, CreditCard, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverViewPage = async () => {
  await requireAdmin();

  const summary = await getOrderSummary();

  return (
    <div className="space-y-2">
      <Heading text="Dashboard" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Total Revenue" icon={BadgeDollarSign}>
          <span className="text-2xl font-bold">
            {formatCurrency(
              summary.totalSales._sum.totalPrice?.toString() || 0,
            )}
          </span>
        </OverviewCard>

        <OverviewCard title="Sales" icon={CreditCard}>
          <span className="text-2xl font-bold">
            {formatNumber(summary.ordersCount)}
          </span>
        </OverviewCard>

        <OverviewCard title="Customers" icon={User}>
          <span className="text-2xl font-bold">
            {formatNumber(summary.usersCount)}
          </span>
        </OverviewCard>

        <OverviewCard title="Products" icon={Barcode}>
          <span className="text-2xl font-bold">
            {formatNumber(summary.productsCount)}
          </span>
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
