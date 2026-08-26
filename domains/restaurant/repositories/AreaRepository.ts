import { prisma } from "@/lib/prisma"


export const AreaRepository = {
    async getAreas() {
        const areas = await prisma.area.findMany({
            where: {
                active: true
            }
        })
        return areas
    }
}