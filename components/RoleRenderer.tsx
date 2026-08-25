'use client'

import { useAuth } from "@/context";
import { RoleType } from "@/domains/identity/types";
import { useRouter } from "next/navigation";


type Props = {
  roles: Partial<Record<RoleType, React.ReactNode>>;
  fallback?: React.ReactNode;
};

export default function RoleRenderer({ roles, fallback }: Props) {
  const { role } = useAuth();
  const router = useRouter()


  if (!role) {
    return null
  }

  const component = roles[role] ?? fallback;

  if (!component) {
    router.push("/unauthorized");
    return
  }

  return component;
}