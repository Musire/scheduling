'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import ManageTabs from "../../../features/admin_manage/components/ManageTabs";
import { requirementWithMeta } from "../requirement.types";
import RequirementCard from "./RequirementCard";

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
                <div className="grid xs:max-md:grid-cols-2 md:grid-cols-3 gap-x-4">
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