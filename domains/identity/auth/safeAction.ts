import { formatActionError } from "@/lib/utils/formatError";
import { getCurrentUser } from "../actions/auth.actions";
import { ActionResult, SecureActionConfig } from "../types";

// Define a unified wrapper response type for your frontend
export type ActionResponse<T> = 
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };


export async function safeAction<T>(
  handler: () => T | Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await handler();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    // Uses your helper to consistently format and return the error state
    return formatActionError(error);
  }
}

export function createSafeAction<Args extends any[], Output>(
  config: SecureActionConfig,
  handler: (...args: Args) => Promise<Output>
): (...args: Args) =>  Promise<ActionResponse<Awaited<Output>>> {
  return async (...args: Args): Promise<ActionResponse<Awaited<Output>>> => {
    try {
      const user = await getCurrentUser();

      if (!user || !user.user_metadata.role) {
        return {
          success: false,
          data: null,
          error: "user not logged in",
        };
      }

      // 1. Core Role authorization
      if (
        config.allowedRoles &&
        !config.allowedRoles.includes(user.user_metadata.role)
      ) {
        throw new Error("Forbidden");
      }

      // 2. Granular Ownership authorization
      if (config.ownerRoles) {
        const rule = config.ownerRoles.find(
          (r) => r.role === user.user_metadata.role
        );

        if (rule) {
          const isOwner = await rule.check();

          if (!isOwner) {
            throw new Error("Forbidden");
          }
        }
      }

      const data = await handler(...args);

      return {
        success: true,
        data,
        error: null,
      };
    } catch (error) {
      return formatActionError(error);
    }
  };
}
