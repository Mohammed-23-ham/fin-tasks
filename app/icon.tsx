import { ImageResponse } from "next/og";

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
          borderRadius: "18px 18px 18px 5px",
          backgroundColor: "#176b55",
          color: "#ffffff",
          fontSize: "42px",
          fontWeight: 700,
        }}
      >
        F
      </div>
    ),
    size,
  );
}