import { SecureActionConfig } from "../types";

export async function createSecureAction<Output>(
  role: string,
  config: SecureActionConfig,
  handler: () => Promise<Output>
): Promise<Output> {
  // 1. Core Role authorization
  if (config.allowedRoles && !config.allowedRoles.includes(role)) {
      throw new Error("Forbidden");
    }

  // 2. Granular Ownership authorization
  if (config.ownerRoles) {
    const rule = config.ownerRoles.find(r => r.role === role);

    if (rule) {
      const isOwner = await rule.check();

      if (!isOwner) {
        throw new Error("Forbidden");
      }
    }
  }

  return handler();
}