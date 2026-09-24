'use client';

import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { toAppTime } from "@/lib/timeUtils";
import { MouseEvent, useTransition } from "react";
import { deleteRequirement } from "../requirement.actions";
import { requirementWithMeta } from "../requirement.types";

type Props = {
  data: requirementWithMeta
}

export default function RequirementCard ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, toggleDrawer } = useDrawer()
    const { isMounted: modalOpen, openDrawer: openModal, closeDrawer: closeModal } = useDrawer()

    if (!data) return null

    const handleDelete = () => {
        startTransition(async () => {
            if (data?.id) {
            const res = await deleteRequirement({ id: data.id });
            if (!res.success && res.error) {
                createError(res.error);
                return;
            }
            createSuccess('Successfully deleted requirement');
            }
        });
        clearDrawer();
    };
    

    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('testing edit')
    }

    return (
        <article
            onClick={toggleDrawer}
            className="flex flex-col h-fit grow-0 p-6 border-border border rounded-lg cursor-pointer grid-cols-[5fr_1fr] gap-4 relative"
        >
            <p className="capitalize text-xl truncate">
                {`${data.area.name} · ${data.role.name}`}
            </p>

            <p className="flex items-center text-else text-sm">
                {`${toAppTime(data.startsAt)} - ${toAppTime(data.endsAt)}`}
            </p>
            <p className="spaced">
            <span className="text-else text-xs">
                Scheduled
            </span>
            <span className="justify-self-end rounded-full normal-space">
                {`${data._count} /  ${data.requiredUsers}`}
            </span>
            </p>
            {isMounted && <div className="w-full spaced">
                <button type="button" onClick={openModal} className="normal-space rounded-full bg-surface-1 cursor-pointer text-error w-20 hover:bg-surface-2">Delete</button>
                <button type="button" onClick={e => handleEdit(e)} className="normal-space rounded-full bg-surface-1 cursor-pointer text-main w-20 hover:bg-surface-2">Edit</button>
            </div>}
            <DeleteModal modalOpen={modalOpen} onClose={closeModal} onDelete={handleDelete} />
        </article>
    );
}