import React from 'react';
import JobCard from '@/components/JobCard';
import { Job } from '@/database/schema';

interface Props {
  title: string;
  jobs: Job[];
  containerClassName?: string;
}

const JobList = ({ title, jobs, containerClassName }: Props) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 dark:text-gray-400">No jobs available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <section className={containerClassName}>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
};

export default JobList;
