import { prisma } from "@/lib/prisma";
import { getWeekLimits } from "@/lib/timeUtils";
import { ShiftDbType } from "./shift.validations.ts";



export const ShiftRepository = {
    async getShifts(weekStart: string) {
    const [startDate, endDate] = getWeekLimits(weekStart);

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
        // 1. Serialize root-level Dates
        shiftDate: shift.shiftDate.toISOString(),
        createdAt: shift.createdAt.toISOString(),
        updatedAt: shift.updatedAt.toISOString(),
        
        // 2. Serialize nested Area Dates
        area: shift.area ? {
            ...shift.area,
            createdAt: shift.area.createdAt.toISOString(),
            updatedAt: shift.area.updatedAt.toISOString(),
        } : null,

        // 3. Serialize nested Role Dates
        role: shift.role ? {
            ...shift.role,
            createdAt: shift.role.createdAt.toISOString(),
            updatedAt: shift.role.updatedAt.toISOString(),
        } : null,

        // 4. Serialize nested User Dates & Decimals
        user: shift.user ? {
                ...shift.user,
                createdAt: shift.user.createdAt.toISOString(),
                updatedAt: shift.user.updatedAt.toISOString(),
                payRate: shift.user.payRate ? shift.user.payRate.toNumber() : null
            } : null
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
    },
    async getEmployeeShifts(weekStart: string, authUserId: string) {
        const [startDate, endDate] = getWeekLimits(weekStart);

        const shifts = await prisma.shift.findMany({
            where: {
                shiftDate: {
                    gte: startDate,
                    lte: endDate,
                },
                user: {
                    authUserId: authUserId, 
                },
            },
            include: {
                user: true,
                area: true,
                role: true,
            },
        });

        return shifts.map(shift => ({
            ...shift,
            shiftDate: shift.shiftDate.toISOString(),
            createdAt: shift.createdAt.toISOString(),
            updatedAt: shift.updatedAt.toISOString(),
            user: shift.user ? {
                ...shift.user,
                payRate: shift?.user?.payRate?.toNumber() 
            } : null
        }));
    }
}