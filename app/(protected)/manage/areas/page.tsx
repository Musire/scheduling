import RoleRenderer from "@/components/RoleRenderer";
import { getAreas } from "@/domains/restaurant/queries/getAreas";
import AreaManagement from "@/features/admin_manage/components/AreaManagement";

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
