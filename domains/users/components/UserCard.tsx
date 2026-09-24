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
            className="border border-border rounded-lg w-full p-4 flex items-center space-x-4 cursor-pointer"
        >
            <div className="bg-surface-1 size-14 rounded-full shrink-0" />
            <p className="stacked space-y-2">
              <span className="text-lg truncate max-w-24">{data.name}</span>
              <span className="text-xs text-else ">incomplete</span>
            </p>
        </article>
    );
}