'use server';

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createRequirementService, deleteRequirementService, updateRequirementService } from "./requirement.services";
import { DeleteRequirementSchema, DeleteRequirmentType, RequirementCreateSchema, RequirementUpdateSchema } from "./RequirementSchema";

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
        const res = await deleteRequirementService(validated)
        revalidatePath('/manage/requirements')
        return res
    }
)