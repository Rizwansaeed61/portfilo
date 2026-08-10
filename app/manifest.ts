import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Rizwan Saeed",
    description: siteConfig.shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#059669",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
