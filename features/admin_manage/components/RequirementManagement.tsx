'use client';

import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import { useTransition } from "react";
import ManageTabs from "./ManageTabs";
import { useToast } from "@/context";
import { deleteRequirement } from "@/domains/restaurant/actions/requirement.actions";

type Props = {
  requirements: unknown[]
}

export default function RequirementMangement ({ requirements }: Props) {
    const [isPending, startTransition] = useTransition()
        const { createSuccess, createError } = useToast()
    
        const handleDelete = (ids?: string[]) => {
          if (!ids || ids.length === 0) return;
          
          startTransition(async() => {
            
            const res = await deleteRequirement({ids})
            if (!res.success) {
                createError(res.error)
                return;
            }
    
            createSuccess('deleted an item')
          })
        }

    return (
        <section className="py-6 flex-1 stacked">
            <ManageTabs activeValue="requirements" />
            <SelectableCrudView 
                items={requirements}
                onDelete={handleDelete}
                renderItem={(item:any) => (
                    <article className="">
                        {item.name}
                    </article>
                )}
            />
        </section>
    );
}