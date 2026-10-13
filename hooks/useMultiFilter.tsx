import { useCallback, useMemo, useState } from "react";

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

  // 1. Fixed @typescript-eslint/no-unsafe-function-type
  const setFilter = useCallback(
    <K extends keyof F>(
      key: K, 
      value: F[K] | ((prevValue: F[K]) => F[K])
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: typeof value === "function" 
          ? (value as (prevValue: F[K]) => F[K])(prev[key]) 
          : value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // 2. Fixed 'Cannot access refs during render' by using filterFn directly 
  const filteredData = useMemo(
    () => data.filter((item) => filterFn(item, filters)),
    [data, filters, filterFn] 
  );

  return {
    filters,
    setFilter,
    setFilters,
    resetFilters,
    filteredData,
  };
}
