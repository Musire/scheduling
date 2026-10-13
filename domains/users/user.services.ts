import { UserRepository } from "./user.repositories";
import { UserCreationType, UserDeleteType, UserUpdateType } from "./user.validations";

export async function getUsersService (weekString: string) {
    return UserRepository.getUsers(weekString)
}

export async function updateUserService (data: UserUpdateType) {
    return UserRepository.updateUser(data)
}

export async function getUserBySlugService (id: string) {
    return UserRepository.getUserBySlug(id)
}

export async function createUserService (data: UserCreationType) {
    return UserRepository.createUser(data)
}

export async function deleteUsersService (data: UserDeleteType) {
    return UserRepository.deleteUsers(data.id)
}