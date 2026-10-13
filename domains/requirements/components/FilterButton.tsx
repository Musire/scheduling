'use client';

import { ChipGroup, ChipOption } from "@/components/chipgroup/ChipGroup";
import { getAreaSimple } from "@/domains/areas/area.actions";
import { useDrawer } from "@/hooks";
import { useFetch } from "@/hooks/useFetch";
import { SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";


type FilterState = {
  weekdays: number[];
  areas: string[];
};

interface FilterPopoverProps {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K] | ((prev: FilterState[K]) => FilterState[K])
  ) => void;
  resetFilters: () => void;
}

const weekdayOptions: ChipOption<number>[] = [
  { label: "All Days", value: "all" },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
];


export default function FilterButton ({filters, setFilter, resetFilters}: FilterPopoverProps) {
    const { isMounted, animation, toggleDrawer } = useDrawer()
    const { data: areas, execute } = useFetch(getAreaSimple)

    useEffect(() => {
        execute()
    }, [execute])

    const areaOptions: ChipOption<string>[] = [
        { label: "All Areas", value: "all" },
        ...(areas?.map((item) => ({
            label: item.name,
            value: item.id, 
        })) ?? []), 
    ];


    return (
        <div className="relative ">
            <button 
                type="button" 
                onClick={toggleDrawer}
                className={`
                    cursor-pointer 
                    size-10 centered rounded-md 
                    ${isMounted ? "bg-surface-2" : "bg-background hover:bg-surface-1"}`}
            >
                <SlidersHorizontal />
            </button>
            {isMounted && (
                <aside className={`
                    border border-border bg-background  
                    rounded-md min-h-40 w-66 p-4 z-30
                    absolute right-0 top-14 stacked
                    ${animation ? "animate-ghostIn": "animate-ghostOut"}`}
                >
                    <ChipGroup
                        label="Weekdays"
                        options={weekdayOptions}
                        selectedValues={filters.weekdays} 
                        onChange={(updater) => setFilter("weekdays", updater)}
                    />
                    <ChipGroup
                        label="Areas"
                        options={areaOptions}
                        selectedValues={filters.areas}
                        onChange={(updater) => setFilter("areas", updater)}
                    />
                </aside>
            )}
        </div>
    );
}