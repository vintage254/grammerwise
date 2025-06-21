"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { jobSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createJob, updateJob } from "@/lib/admin/actions/job";
import { toast } from "@/hooks/use-toast";
import { Job } from "@/lib/types";


interface Props {
  job?: Job;
}

const JobForm = ({ job }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      level: job?.level || "",
      budget: job?.budget || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    try {
      if (job) {
        // Update existing job
        const result = await updateJob(job.id, values);
        if (result.success) {
          toast({
            title: "Success",
            description: "Job updated successfully",
          });
          router.push(`/admin/jobs`);
        } else {
          throw new Error(result.message);
        }
      } else {
        // Create new job
        const result = await createJob(values as any);
        if (result.success) {
          toast({
            title: "Success",
            description: "Job created successfully",
          });
          router.push(`/admin/jobs`);
        } else {
          throw new Error(result.message);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Job Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="e.g. 'Advanced English Conversation Tutor'"
                  {...field}
                  className="job-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Job Description
              </FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Provide a detailed description of the job requirements, responsibilities, and qualifications."
                  {...field}
                  rows={10}
                  className="job-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"level"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                English Level
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 'Beginner', 'Intermediate', 'Advanced'"
                  {...field}
                  className="job-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"budget"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Budget / Rate
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. '$20/hour', 'Fixed price $500'"
                  {...field}
                  className="job-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="job-form_btn text-white bg-blue-600 hover:bg-blue-700">
          {job ? 'Update Job' : 'Create Job Posting'}
        </Button>
      </form>
    </Form>
  );
};
export default JobForm;
