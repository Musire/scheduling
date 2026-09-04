type Props = {
  shift: {
    id: string;
    user: {
        name: string
    };
    role: {
        name: string
    };
    area: {
        name: string
    }
  },
  formattedTime: string;
}

export default function ScheduleCard ({shift, formattedTime}: Props) {
    return (
        <li
            key={shift.id}
            className="hover:bg-neutral-900 cursor-pointer p-3 rounded border border-neutral-800 flex justify-between items-center shrink-0 h-16"
        >
            <div className="flex flex-col">
            <span className="font-medium text-white">
                {shift.user.name}
            </span>

            <div className="flex items-center space-x-2 text-xs text-neutral-400">
                <span className="text-neutral-300">
                {shift.role.name}
                </span>

                <span>•</span>

                <span>
                {shift.area.name}
                </span>
            </div>
            </div>

            <span className="text-neutral-400 text-xs">
            {formattedTime}
            </span>
        </li>
    );
}