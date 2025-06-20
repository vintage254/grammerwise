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
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { User } from "@/database/schema";
import FileUpload from "./FileUpload";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  profilePictureUrl: z.string().optional(),
});

interface ProfileSetupFormProps {
  user: User;
}

const ProfileSetupForm = ({ user }: ProfileSetupFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName || "",
      bio: user.bio || "",
      profilePictureUrl: user.profilePictureUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUser({
      userId: user.id,
      values: {
        ...values,
        profileCompletionPercentage: 33,
      },
    });
    router.refresh();
  }

  return (
    <div>
        <h2 className="text-2xl font-semibold mb-6">Step 1: Profile Setup</h2>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profilePictureUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload your profile picture"
                  folder="avatars"
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio / About Me</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save and Continue</Button>
      </form>
    </Form>
      </div>
  );
};

export default ProfileSetupForm;
