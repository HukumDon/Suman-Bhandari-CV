import { serverEnv } from "@/lib/env";

type Notification = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
};

/**
 * Optional email notification through Resend's REST API (no SDK needed).
 * Does nothing unless RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * Never throws: a failed notification must not break the contact form.
 */
export async function notifyByEmail(entry: Notification): Promise<void> {
  try {
    const env = serverEnv();
    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) return;

    const subjectLine = (entry.subject || `Message from ${entry.name}`).replace(/[\r\n]+/g, " ");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [env.CONTACT_TO_EMAIL],
        reply_to: entry.email,
        subject: `New portfolio message: ${subjectLine}`,
        text: `From: ${entry.name} <${entry.email}>\n\n${entry.message}\n`,
      }),
    });

    if (!response.ok) {
      console.error("[notify] Resend rejected the request", response.status, await response.text());
    }
  } catch (error) {
    console.error("[notify] Could not send notification email", error);
  }
}
