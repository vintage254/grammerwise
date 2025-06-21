import React from "react";
import { db } from "@/database/drizzle";
import { jobs } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BidForm from "@/components/BidForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await auth();

  if (session?.user?.status !== 'APPROVED') {
    redirect('/?unverified=true');
  }

  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

  if (!job) {
    redirect("/404");
  }

  return (
    <div className="container mx-auto mt-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Budget: {job.budget}</span>
            <span>Level: {job.level}</span>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-4 text-xl font-semibold">Job Description</h3>
          <div className="prose max-w-none">
            <p>{job.description}</p>
          </div>
          <div className="mt-8">
            {session?.user ? (
              <BidForm jobId={job.id} />
            ) : (
              <p className="text-center text-muted-foreground">
                Please log in to submit a bid.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailPage;
