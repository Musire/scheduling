import { prisma } from "@/lib/prisma"
import { WeekCreationType } from "./week.validations"


export const WeekRepository = {
    async createSchedule (data: WeekCreationType) {
        const schedule = await prisma.schedule.create({
            data: {
                weekStart: data.week
            }
        })
        return schedule
    }
}