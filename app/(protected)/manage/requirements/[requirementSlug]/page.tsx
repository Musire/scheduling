import RoleRenderer from "@/components/RoleRenderer";
import { getRequirementDetails } from "@/domains/requirements/queries/getRequirements";
import RequirementDetails from "@/features/admin_manage/components/requirement/RequirementDetails";

type Props = {
    searchParams: Promise<{ week?: string }>;
    params: Promise<{ requirementSlug: string }>;
}

export default async function RequirementDetailsPage ({ params, searchParams }: Props) {
    const { week } = await searchParams;
    const weekParam = Array.isArray(week) ? week[0] : week;
    const {requirementSlug} = await params
    const { data } = await getRequirementDetails({dayOfWeek: weekParam, id: requirementSlug})

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
                MANAGER: <RequirementDetails requirement={data} />
            }}
        />
    );
}