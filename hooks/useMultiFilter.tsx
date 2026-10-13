import { useCallback, useEffect, useMemo, useRef, useState } from "react";


export interface RequirementFilters {
  areas: string[];    
  weekdays: number[]; 
}

export const initialFilters: RequirementFilters = {
  areas: [], 
  weekdays: [], 
};



export function useMultiFilter<T, F extends Record<string, unknown>>(
  data: T[],
  initialFilters: F,
  filterFn: (item: T, filters: F) => boolean
) {
  const [filters, setFilters] = useState<F>(initialFilters);

  // 1. Keep a mutable ref of the filter function to prevent unnecessary re-filtering
  const filterFnRef = useRef(filterFn);
  useEffect(() => {
    filterFnRef.current = filterFn;
  }, [filterFn]);

  // 2. Allow functional updates (e.g., setFilter('count', prev => prev + 1))
  const setFilter = useCallback(
    <K extends keyof F>(
      key: K, 
      value: F[K] | ((prevValue: F[K]) => F[K])
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: typeof value === "function" 
          ? (value as Function)(prev[key]) 
          : value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // 3. filterFn is omitted here because we read from filterFnRef.current
  const filteredData = useMemo(
    () => data.filter((item) => filterFnRef.current(item, filters)),
    [data, filters] 
  );

  return {
    filters,
    setFilter,
    setFilters,
    resetFilters,
    filteredData,
  };
}
