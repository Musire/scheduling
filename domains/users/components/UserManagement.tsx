'use client';

import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import UserCard from "@/domains/users/components/UserCard";
import { User } from "@/generated/prisma/client";
import { useTransition } from "react";

type Props = {
  users: User[]
}

export default function UserMangement ({ users }: Props) {
    const { loadModal } = useSidePanel()
    
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()

    return (
        <section className="py-6 flex-1 stacked">
            <div className="spaced">
                <span className="text-2xl font-light">Users</span>
                <button 
                    type="button"
                    onClick={() => loadModal('create-user')}
                    className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
                >
                    + Add
                </button>
            </div>
            <ul className="grid xs:max-md:grid-cols-2 md:grid-cols-3 gap-4 ">
                {users?.map(item => {
                    return (
                        <UserCard key={item.id} data={item} />
                    )
                })}
            </ul>
            {!users.length && (
                <div className="flex-1 centered">
                    <p className="">No users created</p>
                </div>
            )}
        </section>
    );
}