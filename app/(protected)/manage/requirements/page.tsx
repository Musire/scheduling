import RoleRenderer from "@/components/RoleRenderer";
import { getCurrentRequirements } from "@/domains/restaurant/queries/getRequirements";
import RequirementMangement from "@/features/admin_manage/components/RequirementManagement";

export default async function RequirementManagementPage () {

    const { data } = await getCurrentRequirements()

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <RequirementMangement requirements={data ?? []} />   
            }}
        />
    );
}
