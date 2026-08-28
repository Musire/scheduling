import RoleRenderer from "@/components/RoleRenderer";
import AreaDetails from "@/features/admin_manage/components/area/AreaDetails";

type Props = {
  params: Promise<{ areaSlug: string }>
}

export default async function AreaDetailsPage ({ params }: Props) {
    const { areaSlug } = await params

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AreaDetails areaSlug={areaSlug} />   
            }}
        />
    );
}