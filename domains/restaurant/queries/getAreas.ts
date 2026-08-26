'use server'

import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { getAreaService } from "../services/area.services"

export const getAreas = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    getAreaService
)