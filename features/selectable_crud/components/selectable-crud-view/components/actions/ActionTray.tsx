'use client'; 

import { Dispatch, SetStateAction } from "react";
import { ContainerMode } from "../../types";
import CreateAction from "./CreateAction";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";

type Props = {
    setMode: (mode: ContainerMode) => void;
    setSelected: Dispatch<SetStateAction<string[]>>;
    mode: ContainerMode;
    basePath: string;
}

export default function ActionTray ({
    setMode,
    setSelected,
    mode,
    basePath
}: Props) {

    const handleEdit = () => {
        setSelected([])

        if (mode === 'edit') {
            setMode('view')
            return
        }
        setMode('edit')
    }

    const handleDelete = () => {
        setSelected([])

        if (mode === 'delete') {
            setMode('view')
            return
        }
        setMode('delete')
    }

    return (
        <div className="flex text-else w-full justify-end pr-4 items-center space-x-2">
            <CreateAction 
                href={`${basePath}/create`}
            />
            <EditAction
                onClick={handleEdit}
                isActive={mode === 'edit'}
            />
            <DeleteAction 
                onClick={handleDelete}
                isActive={mode === 'delete'}
            />
        </div>
    );
}