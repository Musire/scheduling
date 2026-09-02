import { getAreaDetails } from "@/domains/restaurant/queries/getAreas";
import SelectableRoles from "@/features/admin_manage/components/area/SelectableRoles";

type Props = {
  areaSlug: string;
}

export default async function AreaDetails ({ 
    areaSlug, 
}: Props) {
    const { data } = await getAreaDetails({ name: decodeURIComponent(areaSlug) })
    if (!data) return (
        <section className="">
            <p className="">not found</p>
            <p className="">{areaSlug}</p>
        </section>
    );

    return (
        <section className="py-6 stacked flex-1">
            <SelectableRoles roles={data.roles} />
        </section>
    );
}