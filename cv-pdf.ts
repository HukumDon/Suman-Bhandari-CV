import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { profile } from "@/data/profile";

/**
 * Builds the downloadable CV from src/data/profile.ts, so the PDF and the
 * website can never drift apart. Uses built-in PDF fonts (no downloads).
 */

const PAGE = { width: 595.28, height: 841.89 }; // A4
const MARGIN = 48;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;

const INK = rgb(0.05, 0.06, 0.12);
const MUTED = rgb(0.33, 0.36, 0.44);
const ACCENT = rgb(0.84, 0.13, 0.37);
const RULE = rgb(0.82, 0.85, 0.91);

/** Standard PDF fonts only support WinAnsi, so swap characters outside it. */
function clean(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "");
}

export async function buildCvPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${profile.fullName} - CV`);
  doc.setAuthor(profile.fullName);
  doc.setSubject(profile.headline);
  doc.setCreator("Portfolio");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;

  const ensure = (needed: number) => {
    if (y - needed < MARGIN) {
      page = doc.addPage([PAGE.width, PAGE.height]);
      y = PAGE.height - MARGIN;
    }
  };

  const wrap = (text: string, font: PDFFont, size: number, width: number): string[] => {
    const lines: string[] = [];
    let line = "";
    for (const word of clean(text).split(/\s+/).filter(Boolean)) {
      const attempt = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(attempt, size) <= width) {
        line = attempt;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const paragraph = (
    text: string,
    opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; indent?: number; gap?: number } = {},
  ) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 9.5;
    const indent = opts.indent ?? 0;
    const lineHeight = size * 1.42;
    for (const line of wrap(text, font, size, CONTENT_WIDTH - indent)) {
      ensure(lineHeight);
      y -= lineHeight;
      page.drawText(line, { x: MARGIN + indent, y, size, font, color: opts.color ?? INK });
    }
    y -= opts.gap ?? 0;
  };

  const heading = (text: string) => {
    ensure(40);
    y -= 14;
    page.drawText(clean(text), { x: MARGIN, y: y - 11, size: 11, font: bold, color: ACCENT });
    y -= 17;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE.width - MARGIN, y },
      thickness: 0.6,
      color: RULE,
    });
    y -= 4;
  };

  const rowWithRight = (left: string, right: string, opts: { size?: number; font?: PDFFont } = {}) => {
    const size = opts.size ?? 10.5;
    const font = opts.font ?? bold;
    ensure(size * 1.6);
    y -= size * 1.5;
    const rightText = clean(right);
    const rightWidth = regular.widthOfTextAtSize(rightText, 9);
    page.drawText(clean(left), { x: MARGIN, y, size, font, color: INK, maxWidth: CONTENT_WIDTH - rightWidth - 12 });
    page.drawText(rightText, { x: PAGE.width - MARGIN - rightWidth, y, size: 9, font: regular, color: MUTED });
  };

  // ---- Header
  page.drawText(clean(profile.fullName), { x: MARGIN, y: y - 24, size: 28, font: bold, color: INK });
  y -= 34;
  page.drawText(clean(profile.headline), { x: MARGIN, y: y - 14, size: 12.5, font: regular, color: ACCENT });
  y -= 22;

  const contactBits = [profile.email, profile.phone, profile.location].filter(Boolean) as string[];
  paragraph(contactBits.join("   |   "), { size: 9, color: MUTED });
  const linkLine = profile.socials
    .filter((social) => social.icon !== "mail")
    .map((social) => `${social.label}: ${social.href.replace(/^https?:\/\//, "")}`)
    .join("   |   ");
  if (linkLine) paragraph(linkLine, { size: 9, color: MUTED });

  // ---- Summary
  heading("Profile");
  paragraph(profile.intro, { size: 10 });

  // ---- Experience
  heading("Experience");
  for (const job of profile.experience) {
    ensure(70);
    y -= 6;
    rowWithRight(`${job.role}, ${job.company}`, `${job.start} - ${job.end}`);
    paragraph(`${job.location}  |  ${job.tech.join(", ")}`, { size: 8.5, color: MUTED, gap: 2 });
    paragraph(job.summary, { size: 9.5, gap: 2 });
    for (const achievement of job.achievements) {
      ensure(14);
      const startY = y;
      paragraph(achievement, { size: 9.5, indent: 12 });
      page.drawCircle({ x: MARGIN + 4, y: startY - 9.2, size: 1.3, color: ACCENT });
    }
  }

  // ---- Skills
  heading("Skills");
  for (const group of profile.skills.groups) {
    paragraph(`${group.title}: ${group.items.map((item) => item.name).join(", ")}`, { size: 9.5, gap: 2 });
  }
  if (profile.skills.also.length) {
    paragraph(`Also: ${profile.skills.also.join(", ")}`, { size: 9.5, color: MUTED });
  }

  // ---- Projects
  heading("Selected projects");
  for (const project of profile.projects) {
    ensure(46);
    y -= 4;
    rowWithRight(project.title, project.year, { size: 10 });
    paragraph(project.description, { size: 9.5 });
    paragraph(project.tags.join(", "), { size: 8.5, color: MUTED });
    const link = project.links?.live ?? project.links?.repo;
    if (link) paragraph(link.replace(/^https?:\/\//, ""), { size: 8.5, color: ACCENT });
  }

  // ---- Education
  heading("Education");
  for (const item of profile.education) {
    ensure(40);
    y -= 4;
    rowWithRight(item.degree, `${item.start} - ${item.end}`, { size: 10 });
    paragraph(`${item.institution}, ${item.location}`, { size: 9.5, color: MUTED });
    if (item.details) paragraph(item.details, { size: 9.5 });
  }

  // ---- Certifications and awards
  heading("Certifications");
  for (const credential of profile.certifications) {
    rowWithRight(`${credential.name}`, credential.year, { size: 9.5, font: regular });
    paragraph(credential.issuer, { size: 8.5, color: MUTED });
  }

  heading("Awards");
  for (const award of profile.awards) {
    rowWithRight(award.title, award.year, { size: 9.5 });
    paragraph(`${award.org}${award.description ? `. ${award.description}` : ""}`, { size: 9, color: MUTED });
  }

  return doc.save();
}
