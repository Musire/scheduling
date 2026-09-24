import { AreaRepository } from "../areas/area.repositories";
import { RoleRepository } from "./role.repositories";
import { DeleteRoleType } from "./role.validations";


export async function createRoleService (data: { name: string, areaSlug: string }) {
    const area = await AreaRepository.getAreaByName(data.areaSlug)
    if (!area || !area.id) {
        throw new Error("Area not found")
    }
    return RoleRepository.createRole({ areaId: area.id, name: data.name})
}

export async function deleteRoleService (data: DeleteRoleType) {
    return RoleRepository.deleteRole(data.id)
}