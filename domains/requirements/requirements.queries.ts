import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getRequirementDetailsService, getRequirementsService } from "./requirement.services";


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