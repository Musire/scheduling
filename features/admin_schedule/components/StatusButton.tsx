'use client';
import { useDrawer } from "@/hooks";
import StatusOption from "./StatusOption";
import { ScheduleStatus } from "@/generated/prisma/enums";

type Props = {
  status: ScheduleStatus | null
}

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

const inidicatorColor = {
    DRAFT: 'bg-o',
    PUBLISHED: 'bg-success'
}


export default function StatusButton ({ status }: Props) {
    const { isMounted, animation, toggleDrawer } = useDrawer()
    return (
        <div className="flex justify-end w-full relative">
            <button onClick={status ? toggleDrawer : undefined} type="button" className={`flex rounded-lg items-center space-x-2 normal-space border border-border w-fit ${status ? "cursor-pointer" : "cursor-not-allowed"}`}>
                <div className={`rounded-full size-2 ${status ? inidicatorColor[status] : 'bg-whitesmoke/60'}`} />
                <span className="text-else capitalize">{status ? status.toLowerCase() : 'No Status'}</span>
            </button>
            {isMounted && (
                <aside className={`absolute z-50 right-0 top-14 ${animation ? "animate-ghostIn ": "animate-ghostOut" }`}>
                    <ul className="z-30 bg-deep flex flex-col rounded-md border border-border">
                        {options?.map(o => (
                            <StatusOption key={o.id} data={o} isActive={o.title === status} />
                        ))}
                    </ul>
                </aside>
            )}
        </div>
    );
}