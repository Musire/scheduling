'use server';

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { createRequirementService, deleteRequirementService } from "../services/requirement.services";
import { DeleteRequirementSchema, DeleteRequirmentType } from "../validation/DeleteSchema";
import { RequirementCreateSchema } from "../validation/RequirementSchema";

export const createRequirement = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(_, formData: FormData) => {
        const validated = validateFormData(RequirementCreateSchema, formData)
        return createRequirementService(validated)
    } 
)

export const deleteRequirement = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(input: DeleteRequirmentType) => {
        const validated = validateSchema(DeleteRequirementSchema, input)
        return deleteRequirementService(validated)
    }
)