"use client";

import { useToast } from "@/context";
import { createWeek } from "@/domains/scheduling/actions/week.actions";
import { CalendarPlus, Loader2 } from "lucide-react"; // Example icons
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function CreateWeekButton() {
  const [isPending, startTransition] = useTransition();
  const { createSuccess, createError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Grab the week directly from the URL parameters
  const currentWeek = searchParams.get("week");

  const handleCreateSchedule = () => {
    if (!currentWeek) {
      createError("No week selected in the URL context.");
      return;
    }

    startTransition(async () => {
      try {
        // Convert to ISO string to match your original backend expectation
        const isoWeek = new Date(currentWeek).toISOString();
        
        // Trigger the server action
        const result = await createWeek({ weekStart: isoWeek });

        if (result?.error) {
          createError(result.error);
        } else {
          createSuccess("New schedule created successfully");
          // Server action should call revalidatePath internally, 
          // router.refresh ensures client-side cache updates instantly
          router.refresh();
        }
      } catch (error) {
        createError("Something went wrong. Please try again.");
      }
    });
  };

  if (!currentWeek) return null;

  return (
    <button
      onClick={handleCreateSchedule}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 border rounded-md disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Creating Schedule...</span>
        </>
      ) : (
        <>
          <CalendarPlus className="h-4 w-4" />
          <span>Create Schedule for {currentWeek}</span>
        </>
      )}
    </button>
  );
}
