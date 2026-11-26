"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "next-themes";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/ui/icons";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently crossing the middle of the viewport.
  useEffect(() => {
    const targets = ["top", ...links.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0-z-[60] h-0.5 origin-left bg-accent"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="relative mx-auto max-w-5xl">
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center justify-between gap-2 rounded-full border py-2 pl-3 pr-2 transition-[background-color,border-color,backdrop-filter] duration-300",
              scrolled || open
                ? "border-line bg-canvas/80 backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <a href="#top" className="flex items-center gap-3 rounded-full" aria-label={`${profile.fullName}, back to top`}>
              <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-surface-2 ring-1 ring-line">
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  fill
                  priority
                  unoptimized={profile.photo.src.endsWith(".svg")}
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="hidden text-sm font-medium sm:block">{profile.fullName}</span>
            </a>

            <ul className="hidden items-center lg:flex">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative isolate block rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                        isActive ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      ) : null}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Switch between light and dark theme"
                className="grid size-10 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
              >
                <SunIcon className="hidden dark:block" />
                <MoonIcon className="dark:hidden" />
              </button>

              <a
                href="/cv.pdf"
                download={profile.resumeFileName}
                className={buttonStyles("primary", "hidden md:inline-flex", "sm")}
              >
                <DownloadIcon size={16} />
                CV
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-10 place-items-center rounded-full text-fg transition-colors duration-200 hover:bg-surface-2 lg:hidden"
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open ? (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-line bg-surface p-3 lg:hidden"
              >
                <ul>
                  {links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-2xl px-4 py-3 font-display text-lg transition-colors",
                          active === link.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="/cv.pdf"
                  download={profile.resumeFileName}
                  className={buttonStyles("primary", "mt-2 w-full")}
                >
                  <DownloadIcon size={16} />
                  Download CV
                </a>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
