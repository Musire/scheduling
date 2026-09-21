'use client'

import { useToast } from "@/context";
import { deleteRole } from "@/domains/restaurant/actions/role.actions";
import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import { useParams } from "next/navigation";
import { useTransition } from "react";

type Props<T> = {
  roles: T[]
}

export default function SelectableRoles<T> ({ roles }: Props<T>) {
    const { areaSlug } = useParams()
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()

    const handleDelete = (ids?: string[]) => {
        if (!ids || ids.length === 0) return;
        
        startTransition(async() => {
            const clean = Array.isArray(areaSlug) 
                ? areaSlug[0] 
                : (areaSlug ?? "");
        
            const res = await deleteRole({ areaSlug: clean, ids})
            if (!res.success) {
                createError(res.error)
                return;
            }

            createSuccess('deleted an item')
        })
    }
    return (
        <SelectableCrudView 
            items={roles}
            onDelete={handleDelete}
            renderItem={(item: any) => (
                <article className="">
                    <p className="">{item.name}</p>
                </article>
            )}
        />
    );
}