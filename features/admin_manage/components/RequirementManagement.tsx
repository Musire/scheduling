'use client';

import { useToast } from "@/context";
import { deleteRequirement } from "@/domains/requirements/actions/requirement.actions";
import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import { toAppTime } from "@/lib/timeUtils";
import { useTransition } from "react";
import ManageTabs from "./ManageTabs";

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
            if (!res.success && res.error) {
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
                renderItem={(item:any) => {
                    return (
                        <article className="grid items-center grid-rows-2 bg-o grid-cols-4">
                            <p>{item.area.name}</p>
                            <p className="row-start-2 col-start-1">{item.role.name}</p>
                            <span className="flex items-center space-x-2 row-span-2">
                                <p>{toAppTime(item.startsAt)}</p>
                                <p className="">{`-`}</p>
                                <p>{toAppTime(item.endsAt)}</p>
                            </span>
                            
                            <p className="row-span-2 flex items-center space-x-2">
                                <span className="">{item._count}</span>
                                <span className="">{`-`}</span>
                                <span className="">{item.requiredUsers}</span>
                            </p>
                        </article>
                    )
                }}
            />
        </section>
    );
}