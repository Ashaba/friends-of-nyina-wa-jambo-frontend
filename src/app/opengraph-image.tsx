import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = `${siteName} | Our Lady of Kibeho, Mother of the Word`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0968a2",
        color: "#f9f6f1",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 32,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#e0a608",
        }}
      >
        {siteName}
      </div>
      <div style={{ marginTop: 24, fontSize: 88 }}>Our Lady of Kibeho</div>
      <div style={{ marginTop: 16, fontSize: 40 }}>Mother of the Word</div>
    </div>,
    size
  );
}
