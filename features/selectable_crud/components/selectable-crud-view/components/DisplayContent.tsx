'use client';

import { Dispatch, SetStateAction } from "react";
import { ContainerMode } from "../types";
import SelectableCard from "./SelectableCard";
import { cn } from "@/lib/utils";

type Props<T> = {
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
    items?: T[];
    mode: ContainerMode
    renderItem: (item: T) => React.ReactNode;
    containerStyle? : string;
}

export default function DisplayContent<T extends { id: string, value: string }> ({
    selected,
    setSelected,
    items,
    mode,
    renderItem,
    containerStyle
}: Props<T>) {
    const handleSelect = (id: string) => {
        if (mode === 'edit') {
            if (selected.includes(id)) {
                setSelected(prev => prev.filter(p => p !== id))
                return
            }
            setSelected([id])
            return
        }

        if (selected.includes(id)) {
            setSelected(prev => prev.filter(p => p!== id))
            return
        }

        setSelected(prev => [...prev, id])

    }

    return (
        <div className={cn(`flex-1 `, containerStyle)}>
            {items?.map(i => (
                <SelectableCard key={i.id} 
                    mode={mode}
                    selected={selected.includes(i.id)}
                    onSelect={() => handleSelect(i.id)}
                >
                    {renderItem(i)}
                </SelectableCard>
            ))}
            {!items?.length && <p className="">there are no items</p>}
        </div>
    );
}