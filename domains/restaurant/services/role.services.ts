import { AreaRepository } from "../repositories/AreaRepository";
import { RoleRepository } from "../repositories/RoleRepository";
import { DeleteRoleType } from "../validation/DeleteSchema";


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