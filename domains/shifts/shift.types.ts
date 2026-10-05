
export type SchedulingData = {
    schedules: {
        id: string;
        weekStart: Date;
    }[],
    areaRoles: {
        id: string;
        name: string;
        roles: {
            id: string;
            name: string;
        }[]
    }[],
    users: {
        id: string;
        name: string;
    }[]
}