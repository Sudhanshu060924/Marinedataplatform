import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Placeholder({
  title,
  description,
  externalHref,
}: {
  title: string;
  description?: string;
  externalHref?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground mb-6">{description}</p>
      ) : (
        <p className="text-muted-foreground mb-6">
          This page is a placeholder. Tell me to flesh it out next.
        </p>
      )}
      <div className="flex items-center justify-center gap-3">
        <Button asChild variant="secondary">
          <Link to="/">Go Home</Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard">View Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
