import { prisma } from "@/lib/prisma"
import { ScheduleCreationType } from "../validations/ScheduleSchema"


export const ScheduleRepository = {
    async createSchedule (data: ScheduleCreationType) {
        const schedule = await prisma.schedule.create({
            data
        })
        return schedule
    }
}