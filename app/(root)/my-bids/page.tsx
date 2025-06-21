import { getUserBids } from "@/lib/actions/bid.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";

const MyBidsPage = async () => {
  const bids = await getUserBids();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Bids</CardTitle>
        </CardHeader>
        <CardContent>
          {bids.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Job Deadline</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell className="font-medium">{bid.jobTitle}</TableCell>
                    <TableCell>
                      {dayjs(bid.createdAt).format("MMM D, YYYY")}
                    </TableCell>
                    <TableCell>
                      {dayjs(bid.jobDeadline).format("MMM D, YYYY")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(bid.status || 'pending')} className="capitalize">
                        {bid.status || 'pending'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              You have not placed any bids yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBidsPage;
