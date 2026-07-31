import type { ReactNode } from "react";

/** Optional Tailwind/className passthrough shared by most UI primitives. */
export type ClassNameProps = {
  className?: string;
};

/** Children-only wrapper props. */
export type ChildrenProps = {
  children: ReactNode;
};

/** Common props for polymorphic layout primitives. */
export type AsChildProps<T extends string = "div"> = {
  as?: T;
};
