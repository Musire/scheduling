'use server';

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createShiftService, deleteShiftService, updateShiftService } from "./shfit.services";
import { ShiftCreationSchema, ShiftDeleteSchema, ShiftUpdateSchema } from "./shift.validations.ts";


export const createShift = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (_:any, formData: FormData) =>{
        const validated = validateFormData(ShiftCreationSchema, formData)
        const res = await createShiftService(validated)
        revalidatePath('/schedule', 'page')
        return res
    }
)

export const updateShift = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (_:any, formData: FormData) =>{
        const validated = validateFormData(ShiftUpdateSchema, formData)
        const res = await updateShiftService(validated)
        revalidatePath('/schedule', 'page')
        return res
    }
)

export const deleteShift = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: { id: string }) => {
        const validated = validateSchema(ShiftDeleteSchema, input)
        const res = deleteShiftService(validated)
        revalidatePath('/schedule', 'page')
        return res
    }
)