import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import UsersTable from "@/lib/admin/UsersTable";
import { eq } from "drizzle-orm";

const AdminUsersPage = async () => {
  const allUsers = await db.query.users.findMany({
    where: eq(users.role, 'USER'),
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tutor Applications</h1>
      <UsersTable users={allUsers} />
    </div>
  );
};

export default AdminUsersPage;
