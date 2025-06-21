import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface RecentRequestUser {
  id: string;
  fullName: string | null;
  email: string;
}

interface RecentRequestsProps {
  users: RecentRequestUser[];
}

const RecentRequests = ({ users }: RecentRequestsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Account Requests</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarFallback>{user.fullName?.[0] ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {user.fullName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href={`/admin/users/documents/${user.id}`}>
                    Review
                  </Link>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No new account requests.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentRequests;
