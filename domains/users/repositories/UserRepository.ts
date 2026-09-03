import { UserStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { UserCreationType } from "../validations/UserSchema"


export const UserRepository = {
    async getUsers() {
        const users = await prisma.user.findMany({
            where: {
                role: "END_USER",
                status: {
                    not: UserStatus.DISABLED
                }
            }
        })

        const formattedUsers = users.map(u => {
            const { payRate, ...rest} = u
            return {
                ...rest,
                payRate: payRate ? payRate.toNumber() : null
            }
        })
        return formattedUsers
    },
    async getUserBySlug(name: string) {
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        })
        if (!user) {
            return null;
        }
        const { payRate, ...rest} = user
        return {
            ...rest,
            payRate: payRate ? payRate.toNumber() : null
        }
    },
    async createUser(data: UserCreationType) {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                role: 'END_USER',
                name: data.name,
                payRate: data.payRate
            }
        })
        const {payRate, ...rest} = user 
        return {
            ...rest,
            payRate: payRate ? payRate.toNumber() : null, 
        };
    },
    async deleteUsers(ids: string[]) {
        const users = await prisma.user.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                status: 'DISABLED'
            }
        })
        const formattedUsers = users.map(u => {
            const { payRate, ...rest} = u
            return {
                ...rest,
                payRate: payRate ? payRate.toNumber() : null
            }
        })
        return formattedUsers
    }
}

