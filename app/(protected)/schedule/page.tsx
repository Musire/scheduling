import RoleRenderer from "@/components/RoleRenderer";
import AdminSchedule from "@/features/admin_schedule/components/AdminSchedule";

export default function SchedulePage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AdminSchedule/>
            }}
        />
    );
}