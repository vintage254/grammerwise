"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { applyForJob } from "@/lib/actions/job.actions";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

interface ApplyButtonProps {
  jobId: string;
}

const ApplyButton = ({ jobId }: ApplyButtonProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleApply = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to apply for a job.",
        variant: "destructive",
      });
      return;
    }

    try {
      await applyForJob({ jobId, tutorId: session.user.id });
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleApply}>Apply for this Job</Button>;
};

export default ApplyButton;
