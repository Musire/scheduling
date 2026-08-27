'use server'

import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { createAreaService } from "../services/area.services";
import { AreaCreateSchema } from "../validation/AreaSchema";

export const createArea = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    
    async (_, formData: FormData) => {
        const rawData = Object.fromEntries(formData.entries());
        const validated = AreaCreateSchema.safeParse(rawData);

        if (!validated.success) {
            const errorMessages = validated.error.issues.map(e => e.message).join(', ');
            throw new Error(`Validation error: ${errorMessages}`);
        }

        return await createAreaService(validated.data);
    }
)