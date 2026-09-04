'use server';

import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getScheduleService, getSchedulingService } from "../services/shift.services";


export const getSchedulingData = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getSchedulingService
)

export const getSchedule = createSafeAction(
    {
        allowedRoles: ["MANAGER"]
    },
    getScheduleService
)