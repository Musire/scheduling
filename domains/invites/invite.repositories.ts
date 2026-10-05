import { prisma } from "@/lib/prisma";


export const InviteRepositories = {
    async createInvitation (input: {
        invitedById: string;
        email: string;
        userId: string;
        expiresAt: Date;
    }) {
        const invite = await prisma.invitation.create({
            data: input
        })
        return invite
    },
    async getInvite (email: string) {
        const invite = await prisma.invitation.findFirst({
            where: { email }
        })
        return invite
    },
    async expireInvitation (id: string) {
        const invite = await prisma.invitation.update({
            where: {id},
            data: {
                status: 'EXPIRED'
            }
        })
        return invite
    }
}