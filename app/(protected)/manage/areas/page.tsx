import RoleRenderer from "@/components/RoleRenderer";
import { getAreas } from "@/domains/restaurant/queries/getAreas";
import AreaManagement from "@/features/admin_manage/components/AreaManagement";

const mockItems = [
  {
    id: 'mock-item-001',
    value: 'value-001'
  },
  {
    id: 'mock-item-002',
    value: 'value-002'
  },
  {
    id: 'mock-item-003',
    value: 'value-003'
  },
]

export default async function AreaManagementPage () {
    const areas = await getAreas()
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AreaManagement items={mockItems} />   
            }}
        />
    );
}
