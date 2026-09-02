import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getRequirementsService } from "../services/requirement.services";


export const getCurrentRequirements = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getRequirementsService
)