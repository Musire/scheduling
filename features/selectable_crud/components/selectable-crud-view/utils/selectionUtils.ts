import type { ContainerMode, SelectionMode } from "../types";

export function getSelectionMode(mode: ContainerMode): SelectionMode {
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
  mode: ContainerMode,
  selectedCount: number
): boolean {
  if (mode === "view") return false;

  return selectedCount > 0;
}