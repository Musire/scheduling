import RoleRenderer from "@/components/RoleRenderer";
import RequirementMangement from "@/features/admin_manage/components/RequirementManagement";

export default async function RequirementManagementPage () {

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <RequirementMangement />   
            }}
        />
    );
}
