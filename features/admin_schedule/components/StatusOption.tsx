'use client'

import { useToast } from "@/context";
import { publishWeek, unpublishWeek } from "@/domains/weeks/week.actions";
import { Check } from "lucide-react";
import { ReactNode, useTransition } from "react";

type Props = {
  children?: ReactNode;
  isActive: boolean;
  data: {
    id: string;
    title: string;
    subtitle: string;
  }
  weekId: string
}

export default function StatusOption ({ isActive, data, weekId, children }: Props) {
    const [isPending, startTransition] = useTransition()
    const { createSuccess, createError } = useToast()
    

    const handleClick = () => {
        if (!data.id) return;
        startTransition(async() => {
            const actionFn = data.title.toLowerCase() === 'draft'
                ? unpublishWeek : publishWeek

            const res = await actionFn({id: weekId})

            if (!res.success && res.error) {
                createError(res.error)
                return;
            }

            createSuccess('successfully updated the weekly status')
        })
        
    }

    return (
        <li >
            <button onClick={handleClick} disabled={isActive} type="button" className={`disabled:cursor-not-allowed w-fit p-4 flex space-x-2 bg-background cursor-pointer ${!isActive ? "hover:bg-surface-1" : ''} "}`}>
                <div className={`rounded-full size-2 mt-1 ${data.title !== 'Draft' ? "bg-success" : "bg-o"}`} />
                {children}
                <p className="flex flex-col items-start">
                    <span className="text-sm">{data.title}</span>
                    <span className="text-xs text-else">{data.subtitle}</span>
                </p>
                <span className={`my-auto ml-2 ${isActive ? "text-main" : "text-transparent" }`}>
                    <Check size={20} />
                </span>
            </button>
        </li>
    );
}