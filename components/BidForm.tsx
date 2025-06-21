"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBid } from "@/lib/actions/bid.actions";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bidFormSchema = z.object({
  proposal: z.string().min(10, "Proposal must be at least 10 characters."),
});

interface BidFormProps {
  jobId: string;
}

const BidForm = ({ jobId }: BidFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      proposal: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bidFormSchema>) => {
    const result = await createBid(jobId, values.proposal);
    if (result.success) {
      toast({
        title: "Success!",
        description: "Your bid has been submitted successfully.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold">Express Your Interest</h3>
        <FormField
          control={form.control}
          name="proposal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain why you are the best fit for this job..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Bid"}
        </Button>
      </form>
    </Form>
  );
};

export default BidForm;
