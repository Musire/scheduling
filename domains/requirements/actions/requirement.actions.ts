'use server';

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { createRequirementService, deleteRequirementService, updateRequirementService } from "../services/requirement.services";
import { DeleteRequirementSchema, DeleteRequirmentType, RequirementCreateSchema, RequirementUpdateSchema } from "../validation/RequirementSchema";

export const createRequirement = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(_, formData: FormData) => {
        const validated = validateFormData(RequirementCreateSchema, formData)
        return createRequirementService(validated)
    } 
)

export const updateRequirement = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(_, formData: FormData) => {
        const validated = validateFormData(RequirementUpdateSchema, formData)
        return updateRequirementService(validated)
    } 
)

export const deleteRequirement = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(input: DeleteRequirmentType) => {
        const validated = validateSchema(DeleteRequirementSchema, input)
        return deleteRequirementService(validated.ids)
    }
)