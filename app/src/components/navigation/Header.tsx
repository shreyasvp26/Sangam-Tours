"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Container } from "@/components/layout";
import { Logo } from "@/components/media";
import { HeaderContact } from "@/components/navigation/HeaderContact";
import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { MEDIA_QUERIES, Z_INDEX } from "@/constants";
import { useMediaQuery, useScrolled } from "@/hooks";
import { cn } from "@/lib/cn";

const MobileNavDrawer = dynamic(
  () => import("@/components/navigation/MobileNavDrawer").then((mod) => mod.MobileNavDrawer),
  { ssr: false },
);

/**
 * Site Header — Document 06 Header + Document 03 §4.1 / §4.4 / §4.5.
 * Brand left; nav + contact grouped right with generous gap.
 * Never hides on scroll; compresses height. Phone and WhatsApp always visible.
 */
export function Header() {
  const scrolled = useScrolled(8);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerReady, setDrawerReady] = useState(false);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.lg);

  useEffect(() => {
    if (isDesktop && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isDesktop, drawerOpen]);

  const openDrawer = () => {
    setDrawerReady(true);
    setDrawerOpen(true);
  };

  return (
    <>
      <a
        href="#main-content"
        className="bg-accent text-navy sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:rounded-sm focus:px-4 focus:py-2"
        style={{ zIndex: Z_INDEX.skipLink }}
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "bg-navy/95 text-on-dark ease-standard sticky top-0 z-40 border-b border-white/10 backdrop-blur-md transition-[padding] duration-[var(--sangam-duration-fast)]",
          scrolled ? "py-2.5" : "py-4 md:py-5",
        )}
      >
        <Container className="flex items-center justify-between gap-6 lg:gap-10">
          <Logo href="/" variant="full" onDark compact={scrolled} />

          <div className="flex min-w-0 items-center gap-8 xl:gap-12">
            <NavigationMenu className="hidden lg:flex" />
            <HeaderContact />
            <button
              type="button"
              className="size-touch text-on-dark ease-standard inline-flex items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)] hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] lg:hidden"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-navigation"
              onClick={openDrawer}
            >
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        </Container>
      </header>

      <div id="mobile-navigation">
        {drawerReady ? (
          <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        ) : null}
      </div>
    </>
  );
}
