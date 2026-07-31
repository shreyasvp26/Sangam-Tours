import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client; useEffect on the server.
 * Avoids SSR warnings for layout-sensitive subscriptions.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
