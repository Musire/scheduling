'use client';

import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { Shift } from "@/hooks/useScheduleData";
import { getShiftDuration } from "@/lib/timeUtils";
import { formatToAppTime } from "@/lib/utils/timeConversion";
import { useTransition } from "react";
import { deleteShift } from "../shift.actions";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";

type Props = {
  shift: Shift
}

export default function ShiftCard ({shift}: Props) {
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()
    const { isMounted, animation, toggleDrawer } = useDrawer()
    const { isMounted: isOpen, animation: modalAnimation, openDrawer: openModal, closeDrawer: closeModal } = useDrawer()
    const { loadModal: loadSidepanel } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    
    if (!shift) return;

    const handleDelete = () => {
        startTransition(async () => {
            if (shift?.id) {
            const res = await deleteShift({ id: shift.id });
            if (!res.success && res.error) {
                createError(res.error);
                return;
            }
            createSuccess('Successfully deleted area');
            }
        });
        clearDrawer();
    };

    const handleEdit = () => {
        console.log(shift)
        loadSidepanel('update-shift', shift)
    }


    return (
        <li
            key={shift.id}
            onClick={toggleDrawer}
            className="hover:bg-surface-1  relative cursor-pointer p-3 rounded border border-border flex justify-between items-center shrink-0 h-16"
        >
            <div className="flex flex-col">
            <span className="font-medium text-main capitalize">
                {shift.user?.name}
            </span>
            <div className="flex items-center space-x-2 text-xs text-neutral-400">
                <span className="text-else">
                    {shift.area?.name.toLowerCase()}
                </span>
                <span>•</span>
                <span className="">
                    {shift.role?.name.toLowerCase()}
                </span>
            </div>
            </div>
            <div className="spaced-col">
                <span className="self-end text-sm">
                    {getShiftDuration(shift.startsAt, shift.endsAt)}
                </span>

                <span className="text-neutral-400 text-xs">
                    {formatToAppTime(shift.startsAt, shift.endsAt)}
                </span>
            </div>
            {isMounted && <div className={`h-full w-fit flex items-center absolute right-0  bg-surface-1 ${animation ? 'animate-ghostIn' : 'animate-ghostOut'}`}>
                <button 
                    type="button" 
                    onClick={handleEdit}
                    className="normal-space h-full w-24 hover:bg-blue-500 cursor-pointer">edit</button>
                <button 
                    type="button" 
                    onClick={openModal}
                    className="normal-space h-full w-24 hover:bg-error cursor-pointer">delete</button>
            </div>}

            <DeleteModal modalOpen={isOpen} onClose={closeModal} onDelete={handleDelete} />
        </li>
    );
}