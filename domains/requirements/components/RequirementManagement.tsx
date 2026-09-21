'use client';

import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { deleteRequirement } from "@/domains/requirements/requirement.actions";
import { useTransition } from "react";
import ManageTabs from "../../../features/admin_manage/components/ManageTabs";
import RequirementCard from "./RequirementCard";

type Props = {
  requirements: unknown[]
}

export default function RequirementMangement ({ requirements }: Props) {
    const { loadModal } = useSidePanel()
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()

    const handleDelete = (id: string) => {
        startTransition(async() => {
            const res = await deleteRequirement({id})
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
            {!!requirements.length && (
                <div className="stacked space-y-2">
                    {requirements?.map(r => {
                        return (
                            <RequirementCard key={r?.id} data={r} />
                        )
                })}
                </div>
            )}
            {!requirements.length && (
                <div className="flex-1 centered">
                    <p className="">No requirments set up</p>
                </div>
            )}
        </section>
    );
}