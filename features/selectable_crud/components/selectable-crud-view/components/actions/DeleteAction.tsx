'use client';

type DeleteActionProps = {
  onClick: () => void;
  isActive?: boolean;
};

export default function DeleteAction({
  onClick,
  isActive = false,
}: DeleteActionProps) {
  const active = "bg-whitesmoke text-background "
  const inactive = "hover:text-main"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`cursor-pointer rounded-lg normal-space  ${isActive ? active : inactive}`}
    >
      Delete
    </button>
  );
}