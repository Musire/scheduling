import { prisma } from "@/lib/prisma";
import { getWeekLimits } from "@/lib/timeUtils";
import { ShiftDbType } from "../validations/ShiftSchema";



export const ShiftRepository = {
    async getShifts(weekStart: string) {
        const [startDate, endDate] = getWeekLimits(weekStart)

        const shifts = await prisma.shift.findMany({
            where: {
                shiftDate: {
                    gte: startDate, 
                    lte: endDate
                }
            },
            include: {
                user: true,
                area: true,
                role: true
            }
        });
        
        return shifts.map(shift => ({
            ...shift,
            shiftDate: shift.shiftDate.toISOString(),
            startsAt: shift.startsAt.toISOString(),
            endsAt: shift.endsAt.toISOString(),
            createdAt: shift.createdAt.toISOString(),
            updatedAt: shift.updatedAt.toISOString(),
        }));
    },
    async createShift(data: ShiftDbType) {
        const newShift = await prisma.shift.create({
            data
        })
        return newShift
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
                where: {
                    role: 'END_USER'
                },
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                },
            })

        ]);
        return { schedules, areaRoles, users }
    },
    async getSchedule (weekStart: string) {
        const schedule = await prisma.schedule.findFirst({
            where: {
                weekStart
            }
        })
        return schedule
    }
}