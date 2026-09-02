'use client';

import { cn } from "@/lib/utils";
import { Button } from "../buttons";
import { ActionResponse } from "@/domains/identity/types";

export type FormState = { success: boolean, error: string | null }


type StatusButtonProps<T> = {
  isPending: boolean;
  state: ActionResponse<T>;
  className?: string;
  idleText?: string;
}

export default function StatusButton<T>({
  isPending,
  state,
  className,
  idleText = "Submit"
}: StatusButtonProps<T>) {
  
  // 1. Determine current status
  const isSuccess = state?.success
  const isError = !!state?.error

  return (
    <Button
      type="submit"
      disabled={isPending || isSuccess}
      className={cn(
        // Base styles
        "px-3 py-2 self-end",
        // Conditional colors
        {
          "bg-success-dark text-deep disabled:hover:cursor-not-allowed hover:bg-success-dark": isSuccess,
          "bg-error-dark text-deep hover:opacity-80 hover:bg-error-dark": isError,
          "opacity-70": isPending,
        },
        className
      )}
    >
      {isPending ? (
        "Loading..."
      ) : isSuccess ? (
        "Success!"
      ) : isError ? (
        "Try Again"
      ) : (
        idleText
      )}
    </Button>
  )
}
