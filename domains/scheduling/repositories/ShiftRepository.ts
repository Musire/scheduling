import { prisma } from "@/lib/prisma"
import { ShiftCreationType } from "../validations/ShiftSchema"



export const ShiftRepository = {
    async createShift(data: ShiftCreationType) {
        const shift = await prisma.shift.create({
            data
        })
        return shift
    },
    async getSchedulingData() {
        const [schedules, areaRoles, users] = await Promise.all([
            prisma.schedule.findMany({
                orderBy: {
                    weekStart: 'desc',
                },
                select: {
                    id: true,
                    weekStart: true, 
                },
            }),
            // 2. AREAS & ROLES: Ordered alphabetically (A-Z)
            prisma.area.findMany({
                orderBy: { name: 'asc' },
                select: {
                id: true,
                name: true,
                roles: {
                    select: { id: true, name: true },
                    orderBy: { name: 'asc' },
                },
                },
            }),

            // 3. USERS: Fetched with their relations for client-side filtering
            prisma.user.findMany({
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                },
            })

        ]);
        return { schedules, areaRoles, users }
    }
}