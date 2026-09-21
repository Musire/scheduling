'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import ManageTabs from "../../../features/admin_manage/components/ManageTabs";
import RequirementCard from "./RequirementCard";
import { requirementWithMeta } from "../requirement.types";

type Props = {
  requirements: requirementWithMeta[]
}

export default function RequirementMangement ({ requirements }: Props) {
    const { loadModal } = useSidePanel()


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