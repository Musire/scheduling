'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";

type Props = {
  data: {
    name: string
  }
}

export default function UserCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()
    return (
        <article
            onClick={() => loadModal('user-details', { data })}
            className="bg-surface-1 w-72 p-6 stacked space-y-2 cursor-pointer">
            <p>{data.name}</p>
            <p className="text-xs">{`state : incomplete`}</p>
        </article>
    );
}