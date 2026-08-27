import { AreaRepository } from "../repositories/AreaRepository";
import { AreaType } from "../validation/AreaSchema";
import { DeleteAreaType } from "../validation/DeleteSchema";

export async function getAreaService () {
    return AreaRepository.getAreas()
}

export async function createAreaService (data: AreaType) {
    const found = await AreaRepository.findAreaByName(data.name)
    if (found) {
        throw new Error('name already exists')
    }
    return AreaRepository.createArea(data.name)
}

export async function deleteAreaService (data: DeleteAreaType) {
    return AreaRepository.deleteAreas(data.ids)
}