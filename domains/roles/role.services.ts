import { RoleRepository } from "./role.repositories";
import { DeleteRoleType, RoleCreateType, RoleUpdateType } from "./role.validations";


export async function createRoleService (data: RoleCreateType) {
    return RoleRepository.createRole(data)
}

export async function updateRoleService (data: RoleUpdateType) {
    return RoleRepository.updateRole(data)
}

export async function deleteRoleService (data: DeleteRoleType) {
    return RoleRepository.deleteRole(data.id)
}