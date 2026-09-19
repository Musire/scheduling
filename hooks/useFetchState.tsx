import { ActionResponse } from "@/domains/identity/types";
import { useCallback, useRef, useState, useTransition } from "react";

export type LoadModalOptions<T = any, A extends any[] = any[]> = {
  data?: T;
  fetchFn?: (...args: A) => Promise<ActionResponse<T>>;
  fetchArgs?: A;
};

export function useFetchState<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const requestIdRef = useRef(0);
  const isLoadingRef = useRef(false);

  const loadData = useCallback(async <A extends any[]>(options?: LoadModalOptions<T, A>) => {
    // Prevent duplicate triggers while loading
    if (isLoadingRef.current) return;

    const currentRequestId = ++requestIdRef.current;

    // Case 1: Synchronous pre-fetched data
    if (options?.data !== undefined) {
      setData(options.data);
      setIsLoading(false);
      isLoadingRef.current = false;
      return;
    }

    // Case 2: Async fetch function provided
    if (options?.fetchFn) {
      setIsLoading(true);
      isLoadingRef.current = true;
      setData(null);

      const fetcher = options.fetchFn;
      const args = (options.fetchArgs ?? []) as unknown as A;

      try {
        const res = await fetcher(...args);
        if (currentRequestId === requestIdRef.current) {
          startTransition(() => {
            setData(res?.data ?? null);
          });
        }
      } catch (err) {
        if (currentRequestId === requestIdRef.current) {
          console.error("Failed to load data:", err);
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false);
          isLoadingRef.current = false;
        }
      }
      return;
    }

    // Case 3: No payload provided
    setData(null);
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  const resetFetch = useCallback(() => {
    // Invalidate pending async requests
    requestIdRef.current++;
    isLoadingRef.current = false;
    setData(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading: isLoading || isPending,
    loadData,
    resetFetch,
  };
}