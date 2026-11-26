import { z } from "zod";

/**
 * Server-only environment validation.
 *
 * This is evaluated lazily (on the first contact-form request) so that
 * `next build` succeeds even when secrets are not available at build time.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is not set"),
  IP_HASH_SALT: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),
  CONTACT_FROM_EMAIL: z.string().optional(),
});

export type ServerEnv = z.infer<typeof schema> & { ipHashSalt: string };

let cached: ServerEnv | undefined;

export function serverEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const problems = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid server environment. ${problems}`);
  }

  const salt = parsed.data.IP_HASH_SALT?.trim() ?? "";
  const saltIsStrong = salt.length >= 16;

  if (!saltIsStrong && process.env.NODE_ENV === "production") {
    throw new Error(
      "IP_HASH_SALT must be set to a random string of at least 16 characters (try: openssl rand -hex 32).",
    );
  }

  cached = {
    ...parsed.data,
    ipHashSalt: saltIsStrong ? salt : "development-only-salt-change-me",
  };
  return cached;
}
