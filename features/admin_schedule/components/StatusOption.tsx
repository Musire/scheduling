import { Check } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  isActive: boolean;
  data: {
    id: string;
    title: string;
    subtitle: string;
  }
}

export default function StatusOption ({ isActive, data, children }: Props) {
    return (
        <li className="w-fit p-4 flex space-x-2 bg-background cursor-pointer hover:bg-surface-1">
            <div className={`rounded-full size-2 mt-1 ${data.title !== 'Draft' ? "bg-success" : "bg-o"}`} />
                {children}
                <p className="flex flex-col">
                    <span className="text-sm">{data.title}</span>
                    <span className="text-xs text-else">{data.subtitle}</span>
                </p>
            <span className={`my-auto ml-2 ${isActive ? "text-main" : "text-transparent" }`}>
                <Check size={20} />
            </span>
        </li>
    );
}