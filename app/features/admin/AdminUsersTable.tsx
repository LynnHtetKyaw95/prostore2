import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatUUID } from "@/lib/utils";
import DeleteButtonWithDialog from "./DeleteButtonWithDialog";
import { deleteUser, getAllUsers } from "@/lib/actions/userAction";
import AdminEditProductButton from "./AdminEditProductButton";

type UsersArray = Awaited<ReturnType<typeof getAllUsers>>["data"];

type Props = {
  users: UsersArray;
};

const AdminUsersTable = async ({ users }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ROLE</TableHead>
          <TableHead className="text-center">ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{formatUUID(user.id)}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role === "user" ? (
                <Badge variant={"secondary"}>User</Badge>
              ) : (
                <Badge variant={"default"}>Admin</Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-center">
                <AdminEditProductButton
                  href={`/admin/users/${user.id}`}
                  text="Edit User"
                />

                <DeleteButtonWithDialog
                  id={user.id}
                  action={deleteUser}
                  text="Delete User"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminUsersTable;
