import { prisma } from "@/lib/prisma"
import { UpdateAreaType } from "../validation/AreaSchema"


export const AreaRepository = {
    async getAreas() {
        const areas = await prisma.area.findMany({
            where: {
                active: true
            }
        })
        return areas
    },
    async getAreaByName(name: string) {
        const area = await prisma.area.findUnique({
            where: {
                name
            },
            include: {
                roles: {
                    where: {
                        active: true
                    }
                }
            }
        })
        return area
    },
    async createArea(name: string) {
        const area = await prisma.area.create({
            data: {
                name
            }
        })
        return area
    },
    async updateArea(data : UpdateAreaType) {
        const area = await prisma.area.update({
            where: {
                id : data.id
            },
            data: {
                name: data.name
            }
        })
        return area
    },
    async findAreaByName(name: string) {
        const area = await prisma.area.findUnique({
            where: {
                name
            }
        })
        return area
    },
    async deleteAreas(ids: string[]) {
        const area = await prisma.area.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                active: false
            }
        })

        return area
    },
    async getAreaRoles() {
        const areas = await prisma.area.findMany({
            select: {
                id: true,
                name: true,
                roles: {
                select: {
                    id: true,
                    name: true,
                },
                },
            },
        });
        return areas
    }
}