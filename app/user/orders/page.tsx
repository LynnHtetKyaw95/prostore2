import UserOrdersTable from "@/app/features/user/UserOrdersTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { getUserOrders } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
};

const UserOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getUserOrders({ page: Number(page) || 1 });

  return (
    <div className="space-y-2">
      <Heading text="Orders" />

      <div className="overflow-x-auto">
        <UserOrdersTable orders={orders.data} />
      </div>
      <div className="flex justify-end mt-16">
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
};
export default UserOrdersPage;
