import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getUserBySlugService, getUsersService } from "./user.services";


export const getUsers = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getUsersService
)

export const getUserBySlug = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    getUserBySlugService
)