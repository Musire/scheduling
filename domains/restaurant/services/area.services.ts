import { AreaRepository } from "../repositories/AreaRepository";
import { AreaType, UpdateAreaType } from "../validation/AreaSchema";
import { DeleteAreaType } from "../validation/DeleteSchema";

export async function getAreaService () {
    return AreaRepository.getAreas()
}

export async function getAreaDetailsService (name: string) {
    return AreaRepository.getAreaByName(name)
}

export async function createAreaService (data: AreaType) {
    const found = await AreaRepository.findAreaByName(data.name)
    if (found) {
        throw new Error('name already exists')
    }
    return AreaRepository.createArea(data.name)
}

export async function updateAreaService (data: UpdateAreaType) {
    return AreaRepository.updateArea(data)
}

export async function deleteAreaService (data: DeleteAreaType) {
    return AreaRepository.deleteAreas(data.ids)
}

export async function getAreaRoleService () {
    return AreaRepository.getAreaRoles()
}