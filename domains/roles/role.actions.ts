'use server'

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createRoleService, deleteRoleService, updateRoleService } from "./role.services";
import { DeleteRoleSchema, DeleteRoleType, RoleCreateSchema, RoleUpdateSchema } from "./role.validations";

export const createRole = createSafeAction(
    {   
        allowedRoles: ['MANAGER']
    },
    
    async (_, formData: FormData) => {
        const validated = validateFormData(RoleCreateSchema, formData)
        return await createRoleService(validated);
    }
)

export const updateRole = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(RoleUpdateSchema, formData)
        const res = updateRoleService(validated)
        revalidatePath(`/manage/areas/${validated.areaSlug}`)
        return res
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