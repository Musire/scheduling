import { prisma } from "@/lib/prisma"
import { WeekCreationType, WeekPublishType } from "./week.validations"


export const WeekRepository = {
    async createSchedule (data: WeekCreationType) {
        const schedule = await prisma.schedule.create({
            data: {
                weekStart: data.week
            }
        })
        return schedule
    },
    async publishWeek (data: WeekPublishType) {
        const week = await prisma.schedule.update({
            where: {id: data.id},
            data: {
                status: 'PUBLISHED'
            }
        })

        return week
    },
    async unpublishWeek (data: WeekPublishType) {
        const week = await prisma.schedule.update({
            where: {id: data.id},
            data: {
                status: 'DRAFT'
            }
        })

        return week
    }
}