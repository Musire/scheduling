'use client';

import { useToast } from "@/context";
import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import { User } from "@/generated/prisma/client";
import { useTransition } from "react";
import ManageTabs from "./ManageTabs";
import { deleteUsers } from "@/domains/users/actions/user.actions";

type Props = {
  users: User[]
}

export default function UserMangement ({ users }: Props) {
    const [pending, startTransition] = useTransition()
    const { createError, createSuccess } = useToast()

    const handleDelete = (ids?: string[]) => {
        if (!ids?.length) return ;

        startTransition(async()=> {
            const res = await deleteUsers(ids)
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
            <SelectableCrudView 
                items={users}
                onDelete={handleDelete}
                renderItem={item => {
                    return (
                        <article>
                            <p>{item.name}</p>
                        </article>
                    )
                }}
            />
        </section>
    );
}