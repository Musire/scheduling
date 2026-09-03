'use server';

import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { createShiftService } from "../services/shift.services";


export const createShift = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    createShiftService
)