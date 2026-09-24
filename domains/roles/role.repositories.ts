import { prisma } from "@/lib/prisma"
import { RoleUpdateType } from "./role.validations"

export const RoleRepository = {
    async createRole(data: { areaId: string, name: string }) {
        const role = await prisma.role.create({
            data
        })
        return role
    },
    async updateRole(data: RoleUpdateType) {
        const role = await prisma.role.update({
            where: { id: data.id },
            data: {
                name: data.name
            }
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