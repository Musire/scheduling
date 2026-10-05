import { prisma } from "@/lib/prisma"

export const AuthRepository = {
    async getUserPrismaId (targetId: string) {
        const found = await prisma.user.findUnique({
            where: { authUserId: targetId}
        })
        return found?.id 
    }
}