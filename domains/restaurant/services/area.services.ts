import { AreaRepository } from "../repositories/AreaRepository";

export async function getAreaService () {
    return AreaRepository.getAreas()
}