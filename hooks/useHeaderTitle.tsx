// src/hooks/useHeaderTitle.ts
"use client";

import { ROUTE_TITLES } from "@/domains/config/model/site-map";
import { usePathname } from "next/navigation";

export default function useHeaderTitle() {
  const pathname = usePathname();

  const matchedPattern = Object.keys(ROUTE_TITLES).find((pattern) => {
    const patternSegments = pattern.split("/").filter(Boolean);
    const pathSegments = pathname.split("/").filter(Boolean);

    if (patternSegments.length !== pathSegments.length) return false;

    return patternSegments.every((seg, i) => {
      // Matches if it's a dynamic segment (starting with :) or exact string
      return seg.startsWith(":") || seg === pathSegments[i];
    });
  });

  // Returns the mapped title, or an empty string for the placeholder
  return matchedPattern ? ROUTE_TITLES[matchedPattern] : "";
}
