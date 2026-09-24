import { prisma } from "@/lib/prisma"

export const RoleRepository = {
    async createRole(data: { areaId: string, name: string }) {
        const role = await prisma.role.create({
            data
        })
        return role
    },
    async deleteRole(id: string) {
            const role = await prisma.role.updateMany({
                where: { id },
                data: {
                    active: false
                }
            })
    
            return role
    }
}