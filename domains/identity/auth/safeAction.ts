import { formatActionError } from "@/lib/utils/formatError";
import z from "zod";
import { getCurrentUser } from "../actions/auth.actions";
import { ActionResponse, ActionResult, SecureActionConfig } from "../types";

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

      const data = await handler(...args);

      return {
        success: true,
        data,
        error: undefined,
      };
    } catch (error) {
      return formatActionError(error);
    }
  };
}

export function validateSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): T {
  const validated = schema.safeParse(data);

  if (!validated.success) {
    const errorMessages = validated.error.issues
      .map((e) => e.message)
      .join(", ");

    throw new Error(`Validation error: ${errorMessages}`);
  }

  return validated.data;
}

export function validateFormData<T>(
  schema: z.ZodType<T>,
  formData: FormData
): T {
  return validateSchema(
    schema,
    Object.fromEntries(formData.entries())
  );
}
