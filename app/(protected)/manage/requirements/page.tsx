import RoleRenderer from "@/components/RoleRenderer";
import { getCurrentRequirements } from "@/domains/requirements/queries/getRequirements";
import RequirementMangement from "@/features/admin_manage/components/RequirementManagement";

interface PageProps {
    searchParams: Promise<{ week?: string }>;
}
export default async function RequirementManagementPage({ searchParams }: PageProps) {
    // 1. Await searchParams (Required in Next.js App Router for dynamic pages)
    const { week } = await searchParams;
    const weekParam = Array.isArray(week) ? week[0] : week;
    const { data } = await getCurrentRequirements(weekParam);

    if (!data) {
        return (
            <section className="">
                <p className="">not found</p>
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