'use client';

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { ContainerMode } from "../types";
import SelectableCard from "./SelectableCard";

type Props<T, K extends string> = {
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
    items?: T[];
    mode: ContainerMode;
    getId: (item: T) => K
    renderItem: (item: T) => React.ReactNode;
    containerStyle? : string;
}

export default function DisplayContent<T, K extends string> ({
    selected,
    setSelected,
    items,
    mode,
    getId,
    renderItem,
    containerStyle
}: Props<T, K>) {
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
            {items?.map(i => {
                const id = getId(i)
                return (
                    <SelectableCard key={id} 
                        mode={mode}
                        selected={selected.includes(id)}
                        onSelect={() => handleSelect(id)}
                        id={id}
                    >
                    {renderItem(i)}
                </SelectableCard>
                )
            })}
            {!items?.length && <p className="">there are no items</p>}
        </div>
    );
}