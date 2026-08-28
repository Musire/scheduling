import { getAreaDetails } from "@/domains/restaurant/queries/getAreas";
import SelectableRoles from "@/features/admin_manage/components/area/SelectableRoles";

type Props = {
  areaSlug: string;
}

export default async function AreaDetails ({ 
    areaSlug, 
}: Props) {
    const { data } = await getAreaDetails({ name: areaSlug })
    if (!data) return null;

    return (
        <section className="py-6 stacked flex-1">
            <SelectableRoles roles={data.roles} />
        </section>
    );
}