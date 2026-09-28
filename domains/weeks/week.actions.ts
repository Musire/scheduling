'use server';

import { createSafeAction, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { WeekCreationSchema } from "./week.validations";
import { createWeekService } from "./week.services";

export const createWeek = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: { week: string }) =>{
        const validated = validateSchema(WeekCreationSchema, input)
        const res = await createWeekService(validated)
        revalidatePath('/schedule')
        return res
    }
    
)