'use client';

import { useAuth } from "@/context";
import { RoleType } from "@/domains/identity/types";
import { redirect } from "next/navigation";


type Props = {
  roles: Partial<Record<RoleType, React.ReactNode>>;
  fallback?: React.ReactNode;
};

export function RoleRenderer({ roles, fallback }: Props) {
  const { role } = useAuth();

  if (!role) {
    return null
  }

  const component = roles[role] ?? fallback;

  if (!component) {
    redirect("/unauthorized");
  }

  return component;
}