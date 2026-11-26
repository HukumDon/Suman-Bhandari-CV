import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.fullName}, ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, generated at build time from src/data/profile.ts.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0c10",
          color: "#eceef4",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(255,79,139,0.35), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#9aa1b2" }}>{profile.headline}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>{profile.name.first}</div>
          <div style={{ fontSize: 132, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4, color: "#ff4f8b" }}>
            {profile.name.last}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9aa1b2" }}>{profile.email}</div>
      </div>
    ),
    size,
  );
}
