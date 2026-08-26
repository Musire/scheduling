import type { ReactNode } from "react";

export type ContainerMode = "view" | "edit" | "delete";


export type SelectionMode = "none" | "single" | "multiple";

export type RenderItemContext<T, K extends string> = {
  item: T;
  id: K;
  mode: ContainerMode;
  selected: boolean;
  selectable: boolean;
  toggleSelect: () => void;
};

export type SelectableCrudViewProps<T, K extends string> = {
  items: T[];

  getId: (item: T) => K;

  renderItem: (
    item: T,
    context: RenderItemContext<T, K>
  ) => ReactNode;

  createHref: string;

  editHref: (item: T) => string;

  onDelete: (items: T[]) => Promise<void>;

  renderDeleteDialog?: (props: {
    items: T[];
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) => ReactNode;
};