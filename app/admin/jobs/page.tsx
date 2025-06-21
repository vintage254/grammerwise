import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs } from "@/lib/admin/actions/job";
import JobsTable from "@/components/admin/tables/JobsTable";

const Page = async () => {
  const result = await getJobs();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Jobs</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/jobs/new" className="text-white">
            + Create a New job
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        {result.success ? (
          <JobsTable jobs={result.data} />
        ) : (
          <p className="text-red-500">{result.message || "Failed to load jobs."}</p>
        )}
      </div>
    </section>
  );
};

export default Page;
