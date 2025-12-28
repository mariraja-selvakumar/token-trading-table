import { Skeleton } from "@/components/atoms/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-24 h-3" />
              </div>
            </div>
            <Skeleton className="w-12 h-6 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="w-64 h-8" />
            <Skeleton className="w-96 h-4" />
          </div>

          {/* Table Container */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-border p-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-8 rounded" />
                <Skeleton className="w-28 h-8 rounded" />
                <Skeleton className="w-20 h-8 rounded" />
              </div>
            </div>

            {/* Table */}
            <div className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-4 ml-auto" />
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4"
              >
                <Skeleton className="w-24 h-4 mb-2" />
                <Skeleton className="w-16 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
