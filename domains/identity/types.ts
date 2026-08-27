import { UserRole } from "@/generated/prisma/enums";

export type RoleType = UserRole

export type SecureActionConfig = {
  allowedRoles?: string[];
};

// Define the unified result type
export type ActionResult<T> = 
  | { success: true; data: T; error?: string }
  | { success: false; data: null; error: string };

export type ActionResponse<T> = 
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };
