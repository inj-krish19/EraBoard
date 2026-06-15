import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://eraboard.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/quiz", "/result/", "/era/"],
        disallow: ["/api/", "/profile", "/setup"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}