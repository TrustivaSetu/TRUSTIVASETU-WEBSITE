import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getFounderBySlug } from "@/data/founders";

export const runtime = "nodejs";
export const alt = "Trustiva Setu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const founder = getFounderBySlug(params.slug);
  const name = founder?.name ?? "Trustiva Setu";
  const role = founder?.role ?? "Healthcare Financing Infrastructure";

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
          <img src={logoSrc} width={100} height={100} style={{ marginBottom: 28 }} alt="" />
        )}

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            display: "flex",
            textAlign: "center",
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "#bef264",
            marginTop: 14,
            display: "flex",
          }}
        >
          {role}
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#9aa3c2",
            marginTop: 40,
            display: "flex",
            letterSpacing: 4,
          }}
        >
          TRUSTIVA SETU
        </div>
      </div>
    ),
    { ...size }
  );
}
