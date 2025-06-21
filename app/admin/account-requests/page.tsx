import { getAllUsers } from "@/lib/actions/user.actions";
import UsersTable from "@/components/admin/tables/UsersTable";

const VerificationRequestsPage = async () => {
  const pendingUsers = await getAllUsers({ status: 'PENDING', minCompletion: 66 });

  return (
    <section>
      <h1 className="text-2xl font-semibold">Account Requests</h1>

      <div className="mt-10">
        <UsersTable users={pendingUsers} type="pending" />
      </div>
    </section>
  );
};

export default VerificationRequestsPage;
