import RoleRenderer from "@/components/RoleRenderer";
import { getAreaDetails } from "@/domains/areas/area.queries";
import RoleManagement from "@/domains/roles/components/RoleManagement";
import { RotateCw } from "lucide-react";

type Props = {
  params: Promise<{ areaSlug: string }>
}

export default async function AreaDetailsPage ({ params }: Props) {
    const { areaSlug } = await params
    const { data } = await getAreaDetails({ name: areaSlug })

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
                MANAGER: <RoleManagement items={data.roles}  />   
            }}
        />
    );
}