import RoleRenderer from "@/components/RoleRenderer";
import { getAreaRoles } from "@/domains/restaurant/queries/getAreas";
import CreateRequirementForm from "@/forms/CreateRequirementForm";

export default async function CreateRequirementPage () {
    const { data } = await getAreaRoles()
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <CreateRequirementForm areaRoles={data ?? []} />
            }}
        />
    );
}