import RoleRenderer from "@/components/RoleRenderer";
import AreaDataLayer from "@/domains/areas/components/AreaDataLayer";
import { Suspense } from "react";
import ManagementSkeleton from "../loading";

export default async function AreaManagementPage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: (
                    <Suspense fallback={<ManagementSkeleton/>}>
                        <AreaDataLayer />  
                    </Suspense>
                ) 
            }}
        />
    );
}
