import RoleRenderer from "@/components/RoleRenderer";
import RequirementMangement from "@/domains/requirements/components/RequirementManagement";
import { getCurrentRequirements } from "@/domains/requirements/requirements.queries";
import { RotateCw } from "lucide-react";

interface PageProps {
    searchParams: Promise<{ week?: string }>;
}
export default async function RequirementManagementPage({ searchParams }: PageProps) {
    const { week } = await searchParams;
    const weekParam = Array.isArray(week) ? week[0] : week;
    const { data } = await getCurrentRequirements(weekParam);

    if (!data) {
        return (
            <section className="centered flex-1">
                <RotateCw className="animate-spin" />
            </section>
        )
    }

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <RequirementMangement requirements={data } />   
            }}
        />
    );
}