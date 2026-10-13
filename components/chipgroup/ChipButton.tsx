
interface ChipButtonProps<V> {
  label: string;
  value: V | "all";
  isSelected: boolean;
  onClick: (value: V | "all") => void;
}

export function ChipButton<V>({ label, value, isSelected, onClick }: ChipButtonProps<V>) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`px-3 py-1 truncate cursor-pointer w-24 text-xs font-medium rounded-full border transition-all ${
        isSelected
          ? "bg-main text-background border-main"
          : "bg-background text-else border-border"
      }`}
    >
      {label}
    </button>
  );
}