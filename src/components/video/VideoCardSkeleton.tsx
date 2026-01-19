import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for video cards
 * Maintains layout during data fetching
 */
export function VideoCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video rounded-lg" />

      {/* Video info skeleton */}
      <div className="flex gap-3">
        <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}
