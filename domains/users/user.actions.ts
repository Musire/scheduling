'use server'

import { createSafeAction, validateFormData } from "@/domains/identity/auth/safeAction";
import { createUserService, deleteUsersService } from "./user.services";
import { UserCreationSchema } from "./user.validations";

export const createUser = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async(_:any, formData: FormData) => {
        const validated = validateFormData(UserCreationSchema, formData)
        return createUserService(validated)
    }
)


export const deleteUsers = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    deleteUsersService
)