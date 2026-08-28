import Link from "next/link";
import { ContainerMode } from "../types";
import { usePathname } from "next/navigation";

type Props = {
    mode: ContainerMode;
    selected: boolean
    onSelect: () => void
    name: string
    children: React.ReactNode
}

export default function SelectableCard ({ 
    mode,
    selected,
    onSelect,
    name,
    children
}: Props) {
    const pathname = usePathname()
    return (
        <>
            {mode === 'view' && (
                <Link href={`${pathname}/${name}`} className="">
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