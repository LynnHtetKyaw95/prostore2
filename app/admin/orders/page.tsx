import AdminOrdersTable from "@/app/features/admin/AdminOrdersTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { getAllOrders } from "@/lib/actions/orderAction";
import { requireAdmin } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();

  const { page = "1" } = await props.searchParams;

  const { data, totalPages } = await getAllOrders({
    page: Number(page),
  });

  return (
    <div className="space-y-2">
      <Heading text="Orders" />

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
