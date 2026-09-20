import { ActionResponse } from "@/domains/identity/types";
import { useCallback, useRef, useState, useTransition } from "react";

export function useFetch<T, A extends any[] = []>(
  action: (...args: A) => Promise<ActionResponse<T>>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const requestIdRef = useRef(0);

  const execute = useCallback(
    (...args: A) => {
      const currentRequestId = ++requestIdRef.current;

      startTransition(async () => {
        try {
          const res = await action(...args);

          // Guard against out-of-order race conditions
          if (currentRequestId !== requestIdRef.current) return;

          if (res.success) {
            setData(res.data);
            setError(null);
          } else {
            setData(null);
            setError(res.error ?? "An unexpected error occurred.");
          }
        } catch (err) {
          if (currentRequestId !== requestIdRef.current) return;

          setData(null);
          setError(err instanceof Error ? err.message : "Request failed.");
        }
      });
    },
    [action]
  );

  const reset = useCallback(() => {
    requestIdRef.current++; // Invalidate active requests
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    error,
    isPending,
    execute,
    reset,
  };
}