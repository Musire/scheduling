export type RoleType = "MANAGER" | "ENDUSER"


export type SecureActionConfig = {
  allowedRoles?: string[];
  ownerRoles?: Array<{
    role: string; // Changed from roles: string[] to a single role string
    check: () => Promise<boolean> | boolean;
  }>;
};

// Define the unified result type
export type ActionResult<T> = 
  | { success: true; data: T; error?: string }
  | { success: false; data: null; error: string };
