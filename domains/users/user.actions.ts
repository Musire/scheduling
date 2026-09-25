'use server'

import { createSafeAction, validateFormData, validateSchema } from "@/domains/identity/auth/safeAction";
import { revalidatePath } from "next/cache";
import { createUserService, deleteUsersService } from "./user.services";
import { UserCreationSchema, UserDeleteSchema, UserDeleteType } from "./user.validations";

export const createUser = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(_:any, formData: FormData) => {
        const validated = validateFormData(UserCreationSchema, formData)
        return createUserService(validated)
    }
)

export const deleteUser = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: UserDeleteType) => {
        const validated = validateSchema(UserDeleteSchema, input)
        const res = await deleteUsersService(validated)
        revalidatePath('/manage/users')
        return res
    }
    
)