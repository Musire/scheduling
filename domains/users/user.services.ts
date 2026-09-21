import { UserRepository } from "./user.repositories";
import { UserCreationType } from "./user.validations";

export async function getUsersService () {
    return UserRepository.getUsers()
}

export async function getUserBySlugService (id: string) {
    return UserRepository.getUserBySlug(id)
}

export async function createUserService (data: UserCreationType) {
    return UserRepository.createUser(data)
}

export async function deleteUsersService (id: string) {
    return UserRepository.deleteUsers(id)
}