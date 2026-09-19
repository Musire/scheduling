'use client';
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onDelete: () => void;
  onEdit: () => void;
  className?: string;
}

export default function DrawerTemplate ({ children, onDelete, onEdit, className }: Props) {
    return (
        <div className="stacked flex-1 h-fit">
            <div className={cn('max-h-[65dvh] h-fit overflow-y-auto scrollbar-adjust', className)}>{children}</div>
            <div className="w-full spaced">
                <button type="button" onClick={onDelete} className="normal-space rounded-full bg-surface-1 cursor-pointer text-error w-20 hover:bg-surface-2">Delete</button>
                <button type="button" onClick={onEdit} className="normal-space rounded-full bg-surface-1 cursor-pointer text-main w-20 hover:bg-surface-2">Edit</button>
            </div>
        </div>
    );
}