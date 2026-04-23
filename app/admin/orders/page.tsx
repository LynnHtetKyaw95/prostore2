import AdminOrdersTable from "@/app/features/admin/AdminOrdersTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { getAllOrders } from "@/lib/actions/orderAction";
import { requireAdmin } from "@/lib/actions/userAction";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();

  const { page = "1", query: searchText } = await props.searchParams;

  const { data, totalPages } = await getAllOrders({
    page: Number(page),
    query: searchText,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Heading text="Orders" />
        {searchText && (
          <div className="flex items-center gap-4">
            Filtered by <Badge>{searchText}</Badge>
            <Link href="/admin/orders">
              <X className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <AdminOrdersTable orders={data} />
      </div>
      <div className="flex justify-end mt-16">
        {totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};
export default AdminOrdersPage;
