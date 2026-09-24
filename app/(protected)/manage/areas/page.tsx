import RoleRenderer from "@/components/RoleRenderer";
import { getAreas } from "@/domains/areas/area.queries";
import AreaManagement from "@/domains/areas/components/AreaManagement";

export default async function AreaManagementPage () {
    const { data } = await getAreas()
    if (!data) return null
    
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AreaManagement items={data} />   
            }}
        />
    );
}
