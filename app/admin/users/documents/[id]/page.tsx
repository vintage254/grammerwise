import { getUserById } from "@/lib/actions/user.actions";
import ImageKitImage from "@/components/ImageKitImage";

const UserDocumentsPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Documents for {user.fullName}</h1>
      <p className="text-lg mb-10">{user.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">CV</h2>
          {user.cvUrl ? (
            <ImageKitImage src={user.cvUrl} width={400} height={400} alt={`${user.fullName}'s CV`} />
          ) : (
            <p>No CV uploaded.</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Government ID</h2>
          {user.governmentIdUrl ? (
            <ImageKitImage src={user.governmentIdUrl} width={400} height={400} alt={`${user.fullName}'s Government ID`} />
          ) : (
            <p>No Government ID uploaded.</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Teaching Certificate</h2>
          {user.teachingCertificateUrl ? (
            <ImageKitImage src={user.teachingCertificateUrl} width={400} height={400} alt={`${user.fullName}'s Teaching Certificate`} />
          ) : (
            <p>No Teaching Certificate uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDocumentsPage;
