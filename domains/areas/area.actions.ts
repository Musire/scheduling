'use server'

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createAreaService, deleteAreaService, getAreaSimpleService, updateAreaService } from "./area.services";
import { AreaCreateSchema, AreaUpdateSchema, DeleteAreaSchema, DeleteAreaType } from "./area.validation";

export const createArea = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    
    async (_, formData: FormData) => {
        const validated = validateFormData(AreaCreateSchema, formData)
        const res = await createAreaService(validated);
        revalidatePath('/manage/areas')
        return res
    }
)

export const updateArea = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    async (_, formData: FormData) => {
        const validated = validateFormData(AreaUpdateSchema, formData)
        const res = await updateAreaService(validated);
        revalidatePath('/manage/areas')
        return res
    }
)

export const deleteArea = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: DeleteAreaType) => {
        const validated = validateSchema(DeleteAreaSchema, input)

        const res = await deleteAreaService(validated)
        revalidatePath('/manage/areas')
        return res
    }
)

export const getAreaSimple = createSafeAction(
    {
        allowedRoles: ['MANAGER', 'END_USER']
    },
    getAreaSimpleService
) 
