import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JobForm from "@/components/admin/forms/JobForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/jobs">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <JobForm />
      </section>
    </>
  );
};
export default Page;
