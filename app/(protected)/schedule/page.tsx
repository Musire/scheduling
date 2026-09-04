import RoleRenderer from "@/components/RoleRenderer";
import { getSchedule } from "@/domains/scheduling/queries/getSchedulingData";
import AdminSchedule from "@/features/admin_schedule/components/AdminSchedule";
import { getCurrentWeekString } from "@/lib/timeUtils";
import { redirect } from "next/navigation"; // 👈 Fixed import

type Props = {
  searchParams: Promise<{ week?: string }> 
}


export default async function SchedulePage ({ searchParams }: Props) {
    const { week } = await searchParams;
    
    if (!week) {
        const currentWeek = getCurrentWeekString();
        redirect(`/schedule?week=${currentWeek}`);
    }

    const { data } = await getSchedule(new Date(week).toISOString());
    
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AdminSchedule schedule={data} />
            }}
        />
    );
}
