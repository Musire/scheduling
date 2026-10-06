"use client";

import { useToast } from "@/context";
import { CalendarPlus, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { createWeek } from "../week.actions";

export default function CreateWeekButton() {
  const [isPending, startTransition] = useTransition();
  const { createSuccess, createError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentWeek = searchParams.get("week");

  const handleCreateSchedule = () => {
    if (!currentWeek) {
      createError("No week selected in the URL context.");
      return;
    }

    startTransition(async () => {
      try {
        const isoWeek = new Date(currentWeek).toISOString();
        
        const result = await createWeek({ week: isoWeek });

        if (result?.error) {
          createError(result.error);
        } else {
          createSuccess("New schedule created successfully");
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
