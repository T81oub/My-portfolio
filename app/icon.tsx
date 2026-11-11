import { ImageResponse } from "next/og";
import portfolio from "@/portfolio.config";

// Browser tab icon generated from the config: the owner's initial on the brand blue.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: 16,
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 700,
        }}
      >
        {portfolio.profile.shortName.charAt(0).toUpperCase()}
      </div>
    ),
    size
  );
}
