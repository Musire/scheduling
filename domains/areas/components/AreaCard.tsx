'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { AreaWithRoles } from "../area.types";


type Props = {
    data?: AreaWithRoles
}

export default function AreaCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()
    if (!data) return null;

    return (
        <article
            onClick={() => loadModal('area-details', {data})}
            className="text-mai p-6 border-border border rounded-lg  cursor-pointer flex flex-col space-y-2"
        >
            <p className="text-main text-xl capitalize">{data?.name}</p>
            <p className="text-else text-sm self-end">{`${data._count.roles} roles`}</p>
        </article>
    );
}