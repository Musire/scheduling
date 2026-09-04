'use client';
import { useDrawer } from "@/hooks";
import { Check } from "lucide-react";
import StatusOption from "./StatusOption";

const options = [
    {
        id: 'option-001',
        title: 'Draft',
        subtitle: 'Schedule is editable',
    },
    {
        id: 'option-002',
        title: 'Published',
        subtitle: 'Visible to your team',
    }
]

export default function StatusButton () {
    const { isMounted, animation, toggleDrawer } = useDrawer()
    return (
        <div className="flex justify-end w-full relative">
            <button onClick={toggleDrawer} type="button" className="flex rounded-lg items-center space-x-2 normal-space border border-border w-fit">
                <div className="rounded-full bg-o size-2" />
                <span className="text-else">Draft</span>
            </button>
            {isMounted && (
                <aside className={`absolute z-50 right-0 top-14 ${animation ? "animate-ghostIn ": "animate-ghostOut" }`}>
                    <ul className="z-30 bg-deep flex flex-col rounded-md border border-border">
                        {options?.map(o => (
                            <StatusOption key={o.id} data={o} isActive={o.title === 'Draft'} />
                        ))}
                    </ul>
                </aside>
            )}
        </div>
    );
}