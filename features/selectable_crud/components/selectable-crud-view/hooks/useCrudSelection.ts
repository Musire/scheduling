import { useMemo, useState } from "react";

import type { SelectionMode } from "../types";

type UseCrudSelectionOptions<K extends string> = {
  mode: SelectionMode;
};

export function useCrudSelection<K extends string>({
  mode,
}: UseCrudSelectionOptions<K>) {
  const [selectedIds, setSelectedIds] = useState<Set<K>>(new Set());

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: K) => {
    if (mode === "none") return;

    setSelectedIds((current) => {
      const next = new Set(current);

      if (mode === "single") {
        if (next.has(id)) {
          next.clear();
        } else {
          next.clear();
          next.add(id);
        }

        return next;
      }

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const isSelected = (id: K) => selectedIds.has(id);

  const hasSelection = selectedIds.size > 0;

  const selectedCount = selectedIds.size;

  const selectedId = useMemo(() => {
    if (selectedIds.size !== 1) return undefined;

    return selectedIds.values().next().value as K | undefined;
  }, [selectedIds]);

  return {
    selectedIds,
    selectedId,
    selectedCount,
    hasSelection,
    isSelected,
    toggleSelection,
    clearSelection,
  };
}