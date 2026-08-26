'use client';

type EditActionProps = {
  onClick: () => void;
  isActive?: boolean;
};

export default function EditAction({
  onClick,
  isActive = false,
}: EditActionProps) {
  const active = "bg-whitesmoke text-background "
  const inactive = "hover:text-main"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`cursor-pointer rounded-lg normal-space  ${isActive ? active : inactive}`}
    >
      Edit
    </button>
  );
}