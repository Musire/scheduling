import { Skeleton } from "@/components/ui/skeleton";

export default function AdminScheduleSkeleton() {
  return (
    <section className="py-6 flex flex-1 flex-col space-y-6 items-center bg-neutral-950 text-white w-full animate-pulse">
      <div className="flex justify-end w-full relative">
        <Skeleton className=" rounded-lg normal-space w-20 h-12" />
      </div>
      <div className="spaced h-8 md:h-10 w-full">
        <Skeleton className="w-28 md:w-32 h-full" />
        <div className="w-fit flex items-center space-x-2 h-full">
          <Skeleton className="w-24 md:w-40 h-full" />
          <Skeleton className="size-6 md:w-10 h-full" />
          <Skeleton className="size-6 md:w-10 h-full" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full py-1 h-16 md:h-20">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-full" />
        ))}
      </div>
      <div className=""></div>
    </section>
  )
}
