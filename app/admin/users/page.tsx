import AdminUsersTable from "@/app/features/admin/AdminUsersTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { getAllUsers, requireAdmin } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();

  const { page = "1" } = await props.searchParams;
  const { data, totalPages } = await getAllUsers({
    page: Number(page),
  });

  return (
    <div className="space-y-2">
      <Heading text="Users" />

      <div className="overflow-x-auto">
        <AdminUsersTable users={data} />
      </div>

      <div className="flex justify-end mt-16">
        {totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};
export default AdminUserPage;
