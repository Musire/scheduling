import { getRequirementDetails } from "@/domains/requirements/queries/getRequirements";
import { getAreaRoles } from "@/domains/restaurant/queries/getAreas";
import UpdateRequirementForm from "@/forms/UpdateRequirementForm";

type Props = {
    searchParams: Promise<{ week?: string }>;
    params: Promise<{ requirementSlug: string }>;
}

export default async function RequirementEditPage ({ params, searchParams }: Props) {
    const { data: areaRoles } = await getAreaRoles()

    const { week } = await searchParams;
    const weekParam = Array.isArray(week) ? week[0] : week;
    const {requirementSlug} = await params
    const { data } = await getRequirementDetails({dayOfWeek: weekParam, id: requirementSlug})

    if (!data || !areaRoles) {
        return(
            <section className="">
                <p className="">not found</p>
            </section>
        )
    }
    
    return (
        <section className="">
            <UpdateRequirementForm data={data} areaRoles={areaRoles} />
        </section>
    );
}