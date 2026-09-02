import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getRequirementDetailsService, getRequirementsService } from "../services/requirement.services";


export const getCurrentRequirements = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getRequirementsService
)

export const getRequirementDetails = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getRequirementDetailsService
)