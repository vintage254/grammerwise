"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { User } from "@/database/schema";
import FileUpload from "./FileUpload";


const formSchema = z.object({
  teachingCertificateUrl: z.string().url({ message: "Please upload a valid certificate." }),
  cvUrl: z.string().url({ message: "Please upload a valid CV." }),
  governmentIdUrl: z.string().url().or(z.literal("")).optional(),
  weeklyAvailability: z.string().min(10, { message: "Please describe your availability." }),
  hourlyRate: z.coerce.number().min(1, { message: "Rate must be greater than 0." }),
  tutorPolicyAgreement: z.boolean().default(false).refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),
});

interface VerificationFormProps {
  user: User;
}

const VerificationForm = ({ user }: VerificationFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teachingCertificateUrl: user.teachingCertificateUrl || "",
      cvUrl: user.cvUrl || "",
      governmentIdUrl: user.governmentIdUrl || "",
      weeklyAvailability: user.weeklyAvailability || "",
      hourlyRate: user.hourlyRate || 0,
      tutorPolicyAgreement: user.tutorPolicyAgreement || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUser({
      userId: user.id,
      values: {
        ...values,
        profileCompletionPercentage: 66,
      },
    });
    router.refresh();
  }

  return (
    <div>
    <Form {...form}>
      <h2 className="text-2xl font-semibold mb-6">Step 2: Verification</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="teachingCertificateUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teaching Certificate (TEFL, TESOL, etc.)</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*,.pdf"
                  placeholder="Upload your teaching certificate"
                  folder="certificates"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV / Resume</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*,.pdf"
                  placeholder="Upload your CV/Resume"
                  folder="cvs"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="governmentIdUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government ID (Optional)</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload your Government ID"
                  folder="ids"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weeklyAvailability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weekly Availability</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Mondays 9am-5pm EST, Wednesdays 2pm-7pm EST" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate (USD)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tutorPolicyAgreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the Tutor Policy and Terms of Service.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Save and Continue</Button>
      </form>
    </Form>
      </div>
  );
};

export default VerificationForm;
