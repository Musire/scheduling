'use client';

import { DeleteModal } from "@/components/modal";
import { useDrawer } from "@/hooks";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ContainerMode } from "../types";
import ActionTray from "./actions/ActionTray";
import ContinueButton from "./actions/ContinueButton";
import DisplayContent from "./DisplayContent";

type Props<T, S = string[]> = {
  items: T[];
  onDelete: (args?: S) => void 
  containerStyle? : string;
  renderItem: (item: T) => React.ReactNode;
}

export default function SelectableCrudView<T, S> ({
  items,
  onDelete,
  renderItem,
  containerStyle
} :Props<T, S>) {
    const pathname = usePathname()

    const [mode, setMode] = useState<ContainerMode>('view');
    const [selected, setSelected] = useState<string[]>([]);
    const {
      isMounted: isOpen,
      openDrawer,
      closeDrawer
    } = useDrawer()

    const handleDelete = () => {
      onDelete(selected as S)
      setMode('view')
      setSelected([])
    }

    return (
        <div className="relative flex flex-col flex-1 
        space-y-6 ">
          <ActionTray 
            setMode={setMode}
            mode={mode}
            setSelected={setSelected}
            basePath={pathname}
          />
          <DisplayContent 
            setSelected={setSelected}
            items={items}
            mode={mode}
            selected={selected}
            getId={(i: any) => i.id}
            renderItem={renderItem}
            containerStyle={containerStyle}
          />
          <DeleteModal 
            modalOpen={isOpen}
            onClose={closeDrawer}
            onDelete={handleDelete}
          />
          <ContinueButton 
            mode={mode}
            hasSelection={!!selected.length}
            onDelete={openDrawer}
            selected={selected}
            basePath={pathname}
            getNameById={(id: string) => 
              (items.find((obj: any) => obj.id === id) as { name: string } | undefined)?.name ?? ''
            }
          />
        </div>
    );
}