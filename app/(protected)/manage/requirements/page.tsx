import RoleRenderer from "@/components/RoleRenderer";
import RequirementDataLayer from "@/domains/requirements/components/RequirementDataLayer";
import { convertParamToString } from "@/lib/manipulateParam";
import { Suspense } from "react";
import ManagementSkeleton from "../loading";

interface PageProps {
    searchParams: Promise<{ week?: string }>;
}

export default async function RequirementManagementPage({ searchParams }: PageProps) {
    const { week } = await searchParams;
    const weekParam = convertParamToString(week)

    return (
        <RoleRenderer 
            roles={{
                MANAGER: (
                <Suspense fallback={<ManagementSkeleton />}>
                    <RequirementDataLayer week={weekParam} />              
                </Suspense>)   
            }}
        />
    );
}