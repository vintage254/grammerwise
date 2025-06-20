import ProfileCard from "@/components/profile/ProfileCard";
import ProfileSetupForm from "@/components/ProfileSetupForm";
import VerificationForm from "@/components/VerificationForm";
import PayoutForm from "@/components/PayoutForm";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, jobs } from "@/database/schema";
import { eq } from "drizzle-orm";
import JobList from "@/components/JobList";

const Home = async () => {
  const session = await auth();
  const allJobs = await db.select().from(jobs).where(eq(jobs.isPublished, true));

  // For guests, show the job list
  if (!session?.user?.id) {
    return (
      <main className="my-10 px-2 md:px-5">
        <JobList title="Available Jobs" jobs={allJobs} />
      </main>
    );
  }

  // For logged-in users, fetch their full profile
  const userProfile = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userProfile) {
    return <p>Could not load user profile. Please try again later.</p>;
  }

  const { profileCompletionPercentage, workflowStatus } = userProfile;

  const renderFormOrJobList = () => {
    if (profileCompletionPercentage < 33) {
      return <ProfileSetupForm user={userProfile} />;
    }
    if (profileCompletionPercentage < 66) {
      return <VerificationForm user={userProfile} />;
    }
    if (profileCompletionPercentage < 100 && workflowStatus === 'approved') {
      return <PayoutForm user={userProfile} />;
    }
    // If profile is complete or waiting for approval, show the job list
    return <JobList title="Available Jobs" jobs={allJobs} />;
  };

  return (
    <main className="my-10 px-2 md:px-5 space-y-12">
      <ProfileCard />
      <div className="mt-8">
        {renderFormOrJobList()}
      </div>
    </main>
  );
};

export default Home;
