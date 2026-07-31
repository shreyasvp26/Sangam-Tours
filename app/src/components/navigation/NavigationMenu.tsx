"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";
import { primaryNav } from "@/config/navigation";

type NavigationMenuProps = {
  className?: string;
  onNavigate?: () => void;
};

/**
 * Desktop/tablet inline primary navigation — Document 06 Navigation Menu.
 */
export function NavigationMenu({ className, onNavigate }: NavigationMenuProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-touch text-body ease-standard inline-flex items-center rounded-sm px-3 font-medium transition-colors duration-[var(--sangam-duration-fast)]",
                  "focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none",
                  active ? "text-accent" : "text-on-dark/90 hover:text-on-dark",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
