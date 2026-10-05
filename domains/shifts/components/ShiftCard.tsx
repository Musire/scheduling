import { Shift } from "@/context/CalanderProvider";
import { formatToAppTime, getShiftDuration } from "@/lib/timeUtils";

type Props = {
  shift: Shift
}

export default function ShiftCard ({shift}: Props) {
    return (
        <li
            key={shift.id}
            className="hover:bg-surface-1 cursor-pointer p-3 rounded border border-border flex justify-between items-center shrink-0 h-16"
        >
            <div className="flex flex-col">
            <span className="font-medium text-main capitalize">
                {shift.user?.name}
            </span>
            <div className="flex items-center space-x-2 text-xs text-neutral-400">
                <span className="text-else">
                    {shift.area.name.toLowerCase()}
                </span>
                <span>•</span>
                <span className="">
                    {shift.role.name.toLowerCase()}
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
        </li>
    );
}