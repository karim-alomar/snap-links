import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  title?: string | ReactNode;
  description?: string | ReactNode;
  children: ReactNode;
  backButtonHref?: string;
  backButtonLabel?: false | string;
}
export const AuthCardWrapper = ({
  title,
  description,
  children,
  backButtonHref,
  backButtonLabel,
}: Props) => {
  return (
    <Card className="w-[400px] bg-dark-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="w-full" asChild>
          <Link to={`/auth/${backButtonHref}`}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthCardWrapper;
