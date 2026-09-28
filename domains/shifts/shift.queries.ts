'use server'

import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { getShiftsService } from "./shfit.services"


export const getShifts = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getShiftsService
)