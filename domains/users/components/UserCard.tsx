'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { ExpectedUser } from "../user.types";

type Props = {
  data: ExpectedUser
}

const borderColors = {
  REVOKED: 'border-error/40',
  ACCEPTED: 'border-success/40',
  PENDING: 'border-border',
  EXPIRED: 'border-error/40',
}

export default function UserCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()
    const key = data?.invitation?.status ?? 'PENDING'

    return (
        <article
            onClick={() => loadModal('user-details', { data })}
            className={`border ${borderColors[key]} rounded-lg w-full p-4 flex items-center space-x-4 cursor-pointer`}
        >
            <div className="bg-surface-1 size-14 rounded-full shrink-0" />
            <p className="stacked space-y-2">
              <span className="text-lg truncate max-w-24">{data.name}</span>
              <span className="text-xs text-else lowercase">{data?.invitation?.status ?? 'uninvited'}</span>
            </p>
        </article>
    );
}