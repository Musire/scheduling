'use client';

import { useToast } from "@/context";
import { deleteArea } from "@/domains/restaurant/actions/area.actions";
import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import { useTransition } from "react";
import ManageTabs from "./ManageTabs";
import { Area } from "@/generated/prisma/client";

type Props<T> = {
  items: T[]
}

export default function AreaManagement<T extends Area> ({ 
    items 
}: Props<T>) {

    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()

    const handleDelete = (ids?: string[]) => {
      if (!ids || ids.length === 0) return;
      
      startTransition(async() => {
        
        const res = await deleteArea({ids})
        if (!res.success) {
            createError(res.error)
            return;
        }

        createSuccess('deleted an item')
      })
    }

    return (
        <section className="pt-6 flex-1 flex flex-col space-y-6">
            <ManageTabs activeValue="areas" />
            <SelectableCrudView
                items={items}
                onDelete={handleDelete}
                containerStyle="stacked px-1"
                renderItem={(item) => {
                    return (
                    <article className="text-main">
                        <h3>{item.name}</h3>
                    </article>
                    )
                }}
            />
        </section>
    );
}