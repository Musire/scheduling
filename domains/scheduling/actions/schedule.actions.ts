'use server';

import { createSafeAction, validateFormData } from "@/domains/identity/auth/safeAction";
import { createScheduleService } from "../services/schedule.services";
import { ScheduleCreationSchema } from "../validations/ScheduleSchema";

export const createSchedule = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (_:any, formData: FormData) =>{
        const validated = validateFormData(ScheduleCreationSchema, formData)
        return createScheduleService(validated)
    }
    
)