import AdminUsersTable from "@/app/features/admin/AdminUsersTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { getAllUsers, requireAdmin } from "@/lib/actions/userAction";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();

  const { page = "1", query: searchText } = await props.searchParams;
  const { data, totalPages } = await getAllUsers({
    page: Number(page),
    query: searchText,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Heading text="Users" />
        {searchText && (
          <div className="flex items-center gap-4">
            Filtered by <Badge>{searchText}</Badge>
            <Link href="/admin/users">
              <X className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

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
