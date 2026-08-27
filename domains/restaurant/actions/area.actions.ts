'use server'

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { createAreaService, deleteAreaService } from "../services/area.services";
import { AreaCreateSchema } from "../validation/AreaSchema";
import { DeleteAreaSchema, DeleteAreaType } from "../validation/DeleteSchema";
import { revalidatePath } from "next/cache";

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

export const deleteArea = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: DeleteAreaType) => {
        const data = validateSchema(DeleteAreaSchema, input)

        const res = await deleteAreaService(data)
        revalidatePath('/manage/areas')
        return res
    }
)