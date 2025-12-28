import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <SearchX className="text-muted-foreground" size={40} />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/">
          <Button size="lg">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
