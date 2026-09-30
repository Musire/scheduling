'use server';

import { createSafeAction, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createWeekService, publishWeekService, unpublishWeekService } from "./week.services";
import { WeekCreationSchema, WeekPublishSchema, WeekPublishType } from "./week.validations";

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

export const publishWeek = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: WeekPublishType) => {
        const validated = validateSchema(WeekPublishSchema, input)
        const res = await publishWeekService(validated)
        revalidatePath('/schedule')
        return res
    }
)

export const unpublishWeek = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: WeekPublishType) => {
        const validated = validateSchema(WeekPublishSchema, input)
        const res = await unpublishWeekService(validated)
        revalidatePath('/schedule')
        return res
    }
)