import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getFounderBySlug } from "@/data/founders";
import { getAudienceBySlug } from "@/data/audiences";

export const runtime = "nodejs";
export const alt = "Trustiva Setu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; audience: string }>;
}) {
  const { slug, audience } = await params;
  const founder = getFounderBySlug(slug);
  const aud = getAudienceBySlug(audience);

  const eyebrow = aud?.eyebrow ?? "Trustiva Setu";
  const heading = aud?.heading ?? "Trustiva Setu";
  const founderName = founder?.name ?? "";
  const founderRole = founder?.role ?? "";

  let logoSrc = "";
  try {
    const logoPath = join(process.cwd(), "public", "logo.png");
    const logoData = readFileSync(logoPath).toString("base64");
    logoSrc = `data:image/png;base64,${logoData}`;
  } catch {
    logoSrc = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #10192f 0%, #07111f 60%, #05090f 100%)",
          position: "relative",
          padding: "60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "10px",
            background: "linear-gradient(90deg, #bef264, #6b9b1f)",
            display: "flex",
          }}
        />

        {logoSrc && (
          <img src={logoSrc} width={80} height={80} style={{ marginBottom: 24 }} alt="" />
        )}

        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#bef264",
            letterSpacing: 4,
            display: "flex",
            marginBottom: 18,
          }}
        >
          {eyebrow.toUpperCase()}
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "#ffffff",
            display: "flex",
            textAlign: "center",
            maxWidth: 980,
            lineHeight: 1.15,
          }}
        >
          {heading}
        </div>

        {founderName && (
          <div
            style={{
              fontSize: 26,
              color: "#9aa3c2",
              marginTop: 44,
              display: "flex",
            }}
          >
            Shared by {founderName}{founderRole ? ` · ${founderRole}` : ""}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
