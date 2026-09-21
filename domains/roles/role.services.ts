import { AreaRepository } from "../areas/area.repositories";
import { DeleteRoleType } from "../areas/DeleteSchema";
import { RoleRepository } from "./role.repositories";


export async function createRoleService (data: { name: string, areaSlug: string }) {
    const area = await AreaRepository.getAreaByName(data.areaSlug)
    if (!area || !area.id) {
        throw new Error("Area not found")
    }
    return RoleRepository.createRole({ areaId: area.id, name: data.name})
}

export async function deleteRoleService (data: DeleteRoleType) {
    const area = await AreaRepository.getAreaByName(data.areaSlug)
    if (!area || !area.id) {
        throw new Error("Area not found")
    }
    return RoleRepository.deleteRoles({ areaId: area.id, ids: data.ids })
}