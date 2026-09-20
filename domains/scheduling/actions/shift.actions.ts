'use server';

import { createSafeAction, validateFormData } from "@/domains/identity/auth/safeAction";
import { createShiftService } from "../services/shift.services";
import { ShiftCreationSchema } from "../validations/ShiftSchema";
import { revalidatePath } from "next/cache";


export const createShift = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (_:any, formData: FormData) =>{
        const validated = validateFormData(ShiftCreationSchema, formData)
        const res = await createShiftService(validated)
        revalidatePath('/schedule')
        return res
    }
)