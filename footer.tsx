import { profile } from "@/data/profile";
import { ArrowUpIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-semibold">{profile.fullName}</p>
          <p className="mt-1 text-sm text-muted">{profile.headline}</p>
        </div>

        <SocialLinks />

        <div className="flex items-center justify-between gap-6 md:justify-end">
          <p className="text-sm text-muted">&copy; {new Date().getFullYear()} {profile.fullName}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-fg/50 hover:text-fg"
          >
            <ArrowUpIcon size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
