'use server';

import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getSchedulingService } from "../services/shift.services";


export const getSchedulingData = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getSchedulingService
)