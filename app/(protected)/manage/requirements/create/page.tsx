import RoleRenderer from "@/components/RoleRenderer";
import CreateRequirementForm from "@/domains/requirements/components/CreateRequirementForm";
import { getAreaRoles } from "@/domains/restaurant/queries/getAreas";

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