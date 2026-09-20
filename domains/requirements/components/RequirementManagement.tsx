'use client';

import { useToast } from "@/context";
import { deleteRequirement } from "@/domains/requirements/actions/requirement.actions";
import { useTransition } from "react";
import ManageTabs from "../../../features/admin_manage/components/ManageTabs";
import RequirementCard from "./RequirementCard";
import { useSidePanel } from "@/context/SidepanelProvider";

type Props = {
  requirements: unknown[]
}

export default function RequirementMangement ({ requirements }: Props) {
    const { loadModal } = useSidePanel()

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
            <button 
                type="button"
                onClick={() => loadModal('create-requirement')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            {requirements?.map(r => {
                return (
                    <RequirementCard key={r?.id} data={r} />
                )
            })}
        </section>
    );
}