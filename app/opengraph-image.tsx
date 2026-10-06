import { ImageResponse } from "next/og";

export const alt = "Fin Tasks, a simple daily task manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "72px",
          backgroundColor: "#f4f6f0",
          color: "#1d302b",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "64px",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #e3e9e1",
          }}
        >
          <div
            style={{
              width: "86px",
              height: "86px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "34px",
              borderRadius: "22px 22px 22px 6px",
              backgroundColor: "#176b55",
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginBottom: "18px",
                color: "#176b55",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              YOUR DAY, IN FOCUS
            </div>
            <div style={{ fontSize: "66px", fontWeight: 700, lineHeight: 1.1 }}>
              Fin Tasks
            </div>
            <div
              style={{
                marginTop: "20px",
                color: "#687970",
                fontSize: "28px",
              }}
            >
              Plan the day. Finish what matters.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}