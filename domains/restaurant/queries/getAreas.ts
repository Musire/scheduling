'use server'

import { createSafeAction, validateSchema } from "@/domains/identity/auth/safeAction"
import { getAreaDetailsService, getAreaService } from "../services/area.services"
import { AreaCreateSchema } from "../validation/AreaSchema"

export const getAreas = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    getAreaService
)

export const getAreaDetails = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(input: { name: String}) => {
        const validated = validateSchema(AreaCreateSchema, input)
        return getAreaDetailsService(validated.name)
    }
)