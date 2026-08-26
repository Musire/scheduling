import Link from "next/link";
import { ContainerMode } from "../types";

type Props = {
    mode: ContainerMode;
    selected: boolean
    onSelect: () => void
    children: React.ReactNode
}

export default function SelectableCard ({ 
    mode,
    selected,
    onSelect,
    children
}: Props) {
    return (
        <>
            {mode === 'view' && (
                <Link href={``} className="">
                    {children}
                </Link>
            )}
            {mode === 'edit' && (
                <div 
                    className={`ring-2 ${selected ? "ring-sky-700" : "ring-whitesmoke/20"}`}
                    onClick={() => onSelect()}    
                >
                    {children}
                </div>
            )}
            {mode === 'delete' && (
                <div 
                    className={`ring-2 ${selected ? "ring-error" : "ring-whitesmoke/20"}`}
                    onClick={() => onSelect()}
                >
                    {children}
                </div>
            )}
        </>
    );
}