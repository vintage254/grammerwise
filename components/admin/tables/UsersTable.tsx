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
import { Button } from "@/components/ui/button";
import type { User } from "@/database/schema";
import dayjs from "dayjs";
import { approveUser } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface UsersTableProps {
  users: User[];
  type?: "pending" | "all";
}

const UsersTable = ({ users, type = "all" }: UsersTableProps) => {
  const { toast } = useToast();

  const handleApprove = async (userId: string) => {
    try {
      await approveUser(userId);
      toast({
        title: "Success",
        description: "User has been approved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user.",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
            <TableCaption>
        {type === "pending"
          ? "A list of users pending verification."
          : "A list of all registered users."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{dayjs(user.createdAt).format("MMM D, YYYY")}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-right">
              {type === "pending" ? (
                <Button variant="ghost" onClick={() => handleApprove(user.id)}>
                  Approve
                </Button>
              ) : (
                <Button asChild variant="ghost">
                  <Link href={`/admin/users/documents/${user.id}`}>
                    View Documents
                  </Link>
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
