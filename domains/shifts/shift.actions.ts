'use server';

import { createSafeAction, validateFormData } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createShiftService } from "./shfit.services";
import { ShiftCreationSchema } from "./shift.validations.ts";


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