import RoleRenderer from "@/components/RoleRenderer";
import UserDataLayer from "@/domains/users/components/UserDataLayer";
import { Suspense } from "react";
import ManagementSkeleton from "../loading";

export default async function UserMangementPage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: (
                    <Suspense fallback={<ManagementSkeleton/>}>
                        <UserDataLayer />
                    </Suspense>
                )   
            }}
        />
    );
}
