import RoleRenderer from "@/components/RoleRenderer";
import UserDataLayer from "@/domains/users/components/UserDataLayer";
import { Suspense } from "react";
import ManagementSkeleton from "../loading";

type Props = {
  searchParams: Promise<{ week: string}>
}

export default async function UserMangementPage ({ searchParams }: Props) {
    const { week } = await searchParams 
    return (
        <RoleRenderer 
            roles={{
                MANAGER: (
                    <Suspense fallback={<ManagementSkeleton/>}>
                        <UserDataLayer week={week} />
                    </Suspense>
                )   
            }}
        />
    );
}
