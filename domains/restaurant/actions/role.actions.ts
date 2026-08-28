'use server'

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createRoleService, deleteRoleService } from "../services/role.services";
import { DeleteAreaType, DeleteRoleSchema, DeleteRoleType } from "../validation/DeleteSchema";
import { RoleCreateSchema } from "../validation/RoleSchema";

export const createRole = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    
    async (_, formData: FormData) => {
        const validated = validateFormData(RoleCreateSchema, formData)
        return await createRoleService(validated);
    }
)

export const deleteRole = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: DeleteRoleType) => {
        console.log('running server action')
        console.log(input)
        const validated = validateSchema(DeleteRoleSchema, input)
        console.log(validated)

        const res = await deleteRoleService(validated)
        revalidatePath(`/manage/areas/${validated.areaSlug}`)
        return res
    }
)