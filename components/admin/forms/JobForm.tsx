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
import { createJob } from "@/lib/admin/actions/job";
import { toast } from "@/hooks/use-toast";
import { Job } from "@/lib/types";


interface Props extends Partial<Job> {
  type?: "create" | "update";
}

const JobForm = ({ type, ...job }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job.title || "",
      description: job.description || "",
      level: job.level || "",
      languageFocus: job.languageFocus || "",
      budget: job.budget || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    const result = await createJob(values);

    if (result.success) {
      toast({
        title: "Success",
        description: "Job created successfully",
      });

      router.push(`/admin/jobs`);
    } else {
      toast({
        title: "Error",
        description: result.message,
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
          name={"languageFocus"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Language Focus
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 'Business English', 'Conversational', 'IELTS Prep'"
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
          Create Job Posting
        </Button>
      </form>
    </Form>
  );
};
export default JobForm;
