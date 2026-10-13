import { prisma } from "@/lib/prisma";
import { addDays, endOfDay, isWithinInterval, parseISO } from "date-fns";
import { UserCreationType, UserUpdateType } from "./user.validations";


export const UserRepository = {
    async getUsers(weekString: string) {
        const startDate = parseISO(weekString); 
        const endDate = endOfDay(addDays(startDate, 6));   

        const users = await prisma.user.findMany({
            where: { 
                role: "END_USER", 
                status: { not: "DISABLED" } 
            },
            include: { 
                invitation: { 
                    select: { id: true, status: true } 
                },
                shifts: {
                    select: {
                        shiftDate: true, // Need this to filter in JavaScript
                        startsAt: true, 
                        endsAt: true
                    }
                }
            }
        });

        // 2. Filter shifts and aggregate hours using post-processing
        return users.map(({ payRate, shifts, ...rest }) => {
            const scheduledHours = shifts.reduce((total, shift) => {
                const shiftDateObj = new Date(shift.shiftDate);

                // 1. Verify if the shift falls within the target week interval
                const isThisWeek = isWithinInterval(shiftDateObj, { 
                    start: startDate, 
                    end: endDate 
                });

                if (!isThisWeek) return total;

                // 2. Direct mathematical difference of seconds since midnight
                let durationSeconds = shift.endsAt - shift.startsAt;

                // Handle shifts crossing midnight (e.g., endsAt is smaller than startsAt)
                if (durationSeconds < 0) {
                    durationSeconds += 24 * 60 * 60; // Add a full day's worth of seconds
                }

                const hours = durationSeconds / 3600; // 3600 seconds in an hour
                return total + hours;
            }, 0);

            return {
                ...rest,
                payRate: payRate ? payRate.toNumber() : 0,
                scheduledHours: Math.round(scheduledHours * 100) / 100, 
            };
        });
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
    async updateUser(data: UserUpdateType) {
        const { id, ...rest} = data
        const user = await prisma.user.update({
            where: {id},
            data: rest
        })
        const {payRate, ...all} = user 
        return {
            ...all,
            payRate: payRate ? payRate.toNumber() : null, 
        };
    },
    async deleteUsers(id: string) {
        const user = await prisma.user.update({
            where: { id },
            data: {
                status: 'DISABLED'
            }
        })
        return !user ? null : {
            ...user,
            payRate: user?.payRate?.toNumber()
        }
    }
}

