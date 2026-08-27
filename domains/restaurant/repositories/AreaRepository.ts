import { prisma } from "@/lib/prisma"


export const AreaRepository = {
    async getAreas() {
        const areas = await prisma.area.findMany({
            where: {
                active: true
            }
        })
        return areas
    },
    async createArea(name: string) {
        const area = await prisma.area.create({
            data: {
                name
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
    }
}