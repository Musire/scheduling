'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";

type Props = {
  data?: any
}

export default function AreaCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()
    return (
        <article 
            onClick={() => loadModal('area-details', {data})}
            className="text-mai bg-surface-1 normal-space cursor-pointer"
        >
            <h3>{data.name}</h3>
        </article>
    );
}