'use client';
import { useSidePanel } from "@/context/SidepanelProvider";
import { CalendarX2 } from "lucide-react";

export default function NoSchedule () {
    const { loadModal } = useSidePanel()
    return (
        <div className="centered-col space-y-6 flex-1">
            <CalendarX2 strokeWidth={1} size={70} className="text-mid" />
            <p className="flex flex-col space-y-2 text-center">
                <span className="text-main text-sm">No schedule for this week</span>
                <span className="text-else text-xs">You haven't created a schedule for this week yet</span>
            </p>
            <button onClick={() => loadModal('create-schedule')} type="button" className="bg-whitesmoke/87 cursor-pointer text-deep normal-space rounded-md">Create schedule</button>
        </div>
    );
}