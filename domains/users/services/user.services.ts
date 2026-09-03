import { UserRepository } from "../repositories/UserRepository";
import { UserCreationType } from "../validations/UserSchema";

export async function getUsersService () {
    return UserRepository.getUsers()
}

export async function getUserBySlugService (id: string) {
    return UserRepository.getUserBySlug(id)
}

export async function createUserService (data: UserCreationType) {
    return UserRepository.createUser(data)
}

export async function deleteUsersService (ids: string[]) {
    return UserRepository.deleteUsers(ids)
}