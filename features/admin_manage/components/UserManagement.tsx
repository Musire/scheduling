'use client';

import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import UserCard from "@/domains/users/components/UserCard";
import { deleteUsers } from "@/domains/users/user.actions";
import { User } from "@/generated/prisma/client";
import { useTransition } from "react";
import ManageTabs from "./ManageTabs";

type Props = {
  users: User[]
}

export default function UserMangement ({ users }: Props) {
    const { loadModal } = useSidePanel()
    
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()

    const handleDelete = (id: string) => {

        startTransition(async()=> {
            const res = await deleteUsers(id)
            if (!res.success && res.error) {
                createError(res.error)
                return
            }
            createSuccess('user created successfully')
        })
    }

    return (
        <section className="py-6 flex-1 stacked">
            <ManageTabs activeValue="users" />
            <button 
                type="button"
                onClick={() => loadModal('create-requirement')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            {users?.map(item => {
                return (
                    <UserCard key={item.id} data={item} />
                )
            })}
        </section>
    );
}