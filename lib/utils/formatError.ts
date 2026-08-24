import { Prisma } from "@/generated/prisma";

export function formatActionError(err: unknown): { success: false; data: null; error: string } {
  // 1. Check for specific Prisma Known Request Errors first
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return {
        success: false,
        data: null,
        error: "A record with this unique value already exists."
      }
    }
    // Optional: Handle other common Prisma codes here (e.g., P2025 for Record Not Found)
    if (err.code === "P2025") {
      return {
        success: false,
        data: null,
        error: "The requested record could not be found."
      }
    }
  }

  // 2. Fall back to standard JS Errors next
  if (err instanceof Error) {
    return {
      success: false,
      data: null,
      error: err.message
    }
  }

  // 3. Absolute fallback for strings/unknowns
  return {
    success: false,
    data: null,
    error: typeof err === "string" ? err : "An unexpected server error occurred."
  };
}
