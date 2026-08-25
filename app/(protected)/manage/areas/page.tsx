import RoleRenderer from "@/components/RoleRenderer";
import AreaManagement from "@/features/admin_manage/components/AreaManagement";

export default async function AreaManagementPage () {

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AreaManagement />   
            }}
        />
    );
}
