"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/types";

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps) => {
  return (
    <Table>
      <TableCaption>A list of all job postings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Language Focus</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.title}</TableCell>
            <TableCell>{job.level || "N/A"}</TableCell>
            <TableCell>{job.languageFocus || "N/A"}</TableCell>
            <TableCell>{job.budget || "N/A"}</TableCell>
            <TableCell className="text-right">
              <Button asChild variant="ghost">
                <Link href={`/admin/jobs/${job.id}`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobsTable;
