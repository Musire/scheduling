'use client';
import Link from "next/link";

type CreateActionProps = {
  href: string;
};

export default function CreateAction({
  href,
}: CreateActionProps) {
  return (
    <Link href={href} className="cursor-pointer hover:text-main">
      Create
    </Link>
  );
}