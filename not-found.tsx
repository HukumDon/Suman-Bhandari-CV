import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <p className="font-display text-7xl font-semibold tracking-tighter text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">This page doesn't exist</h1>
        <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-muted">
          The link may be broken or the page may have moved.
        </p>
        <Link href="/" className={buttonStyles("primary", "mt-8")}>
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}
