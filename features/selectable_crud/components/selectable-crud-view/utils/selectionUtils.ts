import type { CrudMode, SelectionMode } from "../types";

export function getSelectionMode(mode: CrudMode): SelectionMode {
  switch (mode) {
    case "view":
      return "none";

    case "edit":
      return "single";

    case "delete":
      return "multiple";
  }
}

export function canContinue(
  mode: CrudMode,
  selectedCount: number
): boolean {
  if (mode === "view") return false;

  return selectedCount > 0;
}