// @/domains/requirements/components/RequirementManagementSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function ManagementSkeleton() {
  return (
    <section className="py-6 flex-1 stacked w-full animate-pulse">
      {/* Header Section (Spaced Wrapper) */}
      <div className="spaced">
        {/* Matches text-2xl font-light */}
        <Skeleton className="h-8 w-40 rounded-md" />
        
        {/* Matches button footprint: w-20, rounded-md, self-end */}
        <Skeleton className="h-8 w-20 rounded-md self-end" />
      </div>

      {/* Grid Footprint: Matches your exact layout breakpoints */}
      <div className="grid xs:max-md:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="p-5 border rounded-xl space-y-4 bg-card/50"
          >
            {/* Top row of RequirementCard skeleton (e.g., Title/Status) */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-[65%] rounded" />
              <Skeleton className="h-4 w-[20%] rounded" />
            </div>

            {/* Description / Metadata rows inside RequirementCard */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-[80%] rounded" />
            </div>

            {/* Bottom metadata row / Footer footprint */}
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-3 w-[40%] rounded" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
