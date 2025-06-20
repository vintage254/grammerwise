import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/database/schema';

const JobCard = (job: Job) => {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.level} &bull; {job.languageFocus}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{job.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-semibold text-lg text-primary">{job.budget}</p>
        <Link href={`/jobs/${job.id}`} passHref>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
