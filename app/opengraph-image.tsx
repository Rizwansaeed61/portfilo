import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rizwan Saeed — Digital Marketing Manager & Shopify Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #090d16 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            RS
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#e2e8f0" }}>
            Rizwan Saeed
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "2px",
              color: "#34d399",
              textTransform: "uppercase",
            }}
          >
            Digital Growth Specialist · UAE · USA · UK
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: "bold",
              lineHeight: 1.2,
              color: "white",
            }}
          >
            Digital Marketing Manager, Performance Marketer & Shopify Developer
          </div>
          <div style={{ fontSize: "20px", color: "#94a3b8" }}>
            AED 4.2M+ Revenue Generated · AED 850K Ad Spend Managed · 5+ Years Experience
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          <div>https://rizwansaddique.site</div>
          <div>Hello@RizwanSaddique.site</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
