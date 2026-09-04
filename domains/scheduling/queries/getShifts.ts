'use server'

import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { getShiftsService } from "../services/shift.services"


export const getShifts = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getShiftsService
)