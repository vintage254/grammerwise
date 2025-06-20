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
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { User } from "@/database/schema";


const formSchema = z.object({
  bankAccount: z.string().min(5, { message: "Please enter a valid account number." }),
  routingNumber: z.string().min(5, { message: "Please enter a valid routing number." }),
});

interface PayoutFormProps {
  user: User;
}

const PayoutForm = ({ user }: PayoutFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankAccount: "",
      routingNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In the future, this will integrate with Stripe Connect
    await updateUser({
      userId: user.id,
      values: {
        profileCompletionPercentage: 100,
        status: 'PENDING' // Set status to PENDING for admin review
      },
    });
    router.refresh();
  }

  return (
    <div>
    <Form {...form}>
      <h2 className="text-2xl font-semibold mb-6">Step 3: Payout Setup</h2>
      <p className="text-gray-500 mb-4">Please provide your bank details for payouts. This information will be securely handled by Stripe.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Your bank account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="routingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Routing Number</FormLabel>
              <FormControl>
                <Input placeholder="Your routing number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Complete Profile</Button>
      </form>
    </Form>
      </div>
  );
};

export default PayoutForm;
