import UpdateUserForm from "@/app/features/admin/UpdateUserForm";
import Heading from "@/components/Heading";
import { getUserById, requireAdmin } from "@/lib/actions/userAction";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update User",
};

const AdminUserUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;
  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <UpdateUserForm user={user} />
    </div>
  );
};
export default AdminUserUpdatePage;
