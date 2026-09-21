import { prisma } from "@/lib/prisma"

export const RoleRepository = {
    async createRole(data: { areaId: string, name: string }) {
        const role = await prisma.role.create({
            data
        })
        return role
    },
    async deleteRoles(data: { areaId: string, ids: string[]}) {
            const role = await prisma.role.updateMany({
                where: {
                    areaId: data.areaId,
                    id: {
                        in: data.ids
                    }
                },
                data: {
                    active: false
                }
            })
    
            return role
    }
}