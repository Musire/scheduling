import { Check } from "lucide-react";

type SelectableCardProps = {
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
}

export default function SelectableCard({
  selected,
  onSelect,
  children
}: SelectableCardProps) {
    const isSelected = selected 
        ? 'ring-primary-hover bg-darkest' 
        : 'ring-whitesmoke/20 hover:bg-deep';

  return (
    
    <li className={`ring-2 flex size-66 relative rounded-xl  ${isSelected}`}>
        <button
            type="button"
            onClick={onSelect}
            className={` w-full text-left h-full hover:cursor-pointer rounded-xl ${isSelected}`}
        >
            {children}
        </button>
        <div className={`absolute size-6 right-6 top-6 bg-deep  rounded-full ring-2 ${selected ? "ring-primary-hover": "hidden"} centered`}>
            <Check size={20} className="text-primary-hover" />
        </div>
    </li>
  )
}
