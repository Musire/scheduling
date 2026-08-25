import { useDrawer } from "@/hooks";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Pencil, FileText, Calendar, History } from "lucide-react";

type Props = {
    children?: React.ReactNode
}

export default function ActionButton({ 
    children
}: Props) {
  const { isMounted, toggleDrawer } = useDrawer();

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={toggleDrawer}
        className="surface-1 hover:bg-surface-2 flex size-10 items-center justify-center rounded-full transition-colors"
      >
        <EllipsisVertical className="size-5" />
      </button>

      {/* Backdrop */}
      <div
        onClick={toggleDrawer}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isMounted
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50",
          "transition-transform duration-300 ease-out",
          isMounted ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-zinc-900">
          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 flex-col flex space-y-2">
            <h2 className="mb-6 text-lg font-semibold text-white">
              More Actions
            </h2>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}