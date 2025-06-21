import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import JobForm from '@/components/admin/forms/JobForm';
import { getJobById } from '@/lib/actions/job.actions';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const response = await getJobById(id);

  if (!response.success || !response.data) {
    return (
      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <p>{response.error || 'The requested job could not be found.'}</p>
        <Button asChild className="mt-4">
          <Link href="/admin/jobs">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button asChild className="back-btn mb-4">
        <Link href="/admin/jobs">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
        <JobForm job={response.data} />
      </section>
    </>
  );
};

export default Page;
