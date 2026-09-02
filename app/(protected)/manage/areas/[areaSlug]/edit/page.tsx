import RoleRenderer from "@/components/RoleRenderer";
import { getAreaDetails } from "@/domains/restaurant/queries/getAreas";
import { UpdateAreaForm } from "@/forms";

type Props = {
  params: Promise<{ areaSlug: string }>
}

export default async function UpdateAreaPage ({ params }: Props) {
    const { areaSlug } = await params
    const { data } = await getAreaDetails({ name: decodeURIComponent(areaSlug) })
    if (!data) return (
        <section className="flex-1 centered">
            <p className="">area not found</p>
        </section>
    )

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <UpdateAreaForm data={data} />
            }}
        />
    );
}