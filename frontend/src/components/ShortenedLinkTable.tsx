import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { BarChart, Edit, Eye, Link, Trash } from "lucide-react";

const mockLinks = [
  {
    id: 1,
    shortLink: "https://short.ly/abc123",
    originalLink: "https://www.example.com/very/long/url/1",
    clicks: 100,
  },
  {
    id: 2,
    shortLink: "https://short.ly/def456",
    originalLink: "https://www.anotherexample.com/another/long/url/2",
    clicks: 75,
  },
];
export const ShortenedLinkTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Shortened Links</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Link</TableHead>
              <TableHead>Original Link</TableHead>
              <TableHead>Analytics</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <a
                    href={link.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Link className="w-4 h-4 mr-1" />
                    {link.shortLink}
                  </a>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {link.originalLink}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <BarChart className="w-4 h-4 mr-1" />
                    {link.clicks} clicks
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-start gap-2">
                  <Button variant="outline" size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button size="icon">
                    <Edit size={18} />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
