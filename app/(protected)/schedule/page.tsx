import RoleRenderer from "@/components/RoleRenderer";
import AdminSchedulingDataLayer from "@/domains/weeks/components/AdminSchedulingDataLayer";
import { getCurrentWeekString } from "@/lib/timeUtils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminScheduleSkeleton from "./loading";
import UserSchedulingDataLayer from "@/domains/weeks/components/UserSchedulingDataLayer";

type Props = {
  searchParams: Promise<{ week?: string }> 
}

export default async function SchedulePage ({ searchParams }: Props) {
    const { week } = await searchParams;
    
    if (!week) {
        const currentWeek = getCurrentWeekString();
        redirect(`/schedule?week=${currentWeek}`);
    }

    const weekString = new Date(week).toISOString()

    return (
        <RoleRenderer 
            roles={{
                MANAGER: (
                    <Suspense fallback={<AdminScheduleSkeleton/>}>
                        <AdminSchedulingDataLayer weekString={weekString} />
                    </Suspense>
                ),
                END_USER: (
                    <Suspense fallback={<AdminScheduleSkeleton/>}>
                        <UserSchedulingDataLayer weekString={weekString} />
                    </Suspense>
                )
            }}
        />
    );
}
