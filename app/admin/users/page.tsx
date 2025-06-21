import { getAllUsers } from "@/lib/actions/user.actions";
import UsersTable from "@/components/admin/tables/UsersTable";

const AdminUsersPage = async () => {
  const allUsers = await getAllUsers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <UsersTable users={allUsers} />
    </div>
  );
};

export default AdminUsersPage;
