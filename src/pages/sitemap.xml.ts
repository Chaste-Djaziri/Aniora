import type { GetServerSideProps } from "next";

import CollectionIDs from "@/assets/collection_ids.json";
import { buildCanonicalUrl, SITE_URL } from "@/lib/seo";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

const STATIC_ROUTES: SitemapEntry[] = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/movie", changefreq: "daily", priority: "0.9" },
  { loc: "/tv", changefreq: "daily", priority: "0.9" },
  { loc: "/anime", changefreq: "weekly", priority: "0.8" },
  { loc: "/kdrama", changefreq: "weekly", priority: "0.8" },
  { loc: "/collections", changefreq: "weekly", priority: "0.7" },
  { loc: "/downloads", changefreq: "monthly", priority: "0.4" },
  { loc: "/disclaimer", changefreq: "yearly", priority: "0.2" },
];

const buildXml = (entries: SitemapEntry[]) => {
  const urls = entries
    .map(({ loc, lastmod, changefreq, priority }) => {
      const absoluteUrl = buildCanonicalUrl(loc);
      const lastmodTag = lastmod
        ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>`
        : "";
      const changefreqTag = changefreq
        ? `<changefreq>${changefreq}</changefreq>`
        : "";
      const priorityTag = priority ? `<priority>${priority}</priority>` : "";
      return `  <url>\n    <loc>${absoluteUrl.replace(/&/g, "&amp;")}</loc>\n${lastmodTag ? `    ${lastmodTag}\n` : ""}${changefreqTag ? `    ${changefreqTag}\n` : ""}${priorityTag ? `    ${priorityTag}\n` : ""}  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
};

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const origin = req?.headers?.host
    ? `${req.headers["x-forwarded-proto"] ?? "https"}://${req.headers.host}`
    : SITE_URL;

  const dynamicEntries: SitemapEntry[] = [];

  const appendMediaEntries = (
    items: any[] = [],
    type: "movie" | "tv" = "movie",
  ) => {
    items.slice(0, 20).forEach((item) => {
      if (!item?.id) return;
      const mediaPath = `/detail?type=${type}&id=${item.id}`;
      dynamicEntries.push({
        loc: mediaPath,
        lastmod: item?.release_date || item?.first_air_date,
        changefreq: "weekly",
        priority: "0.8",
      });
      if (type === "tv") {
        dynamicEntries.push({
          loc: `/watch?type=tv&id=${item.id}&season=1&episode=1`,
          lastmod: item?.first_air_date,
          changefreq: "weekly",
          priority: "0.7",
        });
      } else {
        dynamicEntries.push({
          loc: `/watch?type=movie&id=${item.id}`,
          lastmod: item?.release_date,
          changefreq: "weekly",
          priority: "0.7",
        });
      }
    });
  };

  try {
    const trendingMovieResponse = await fetch(
      `${origin}/api/backendfetch?requestID=trendingMovieDay&page=1`,
    );
    if (trendingMovieResponse.ok) {
      const trendingMovies = await trendingMovieResponse.json();
      appendMediaEntries(trendingMovies?.results, "movie");
    }
  } catch (error) {
    console.error("Failed to append trending movies to sitemap", error);
  }

  try {
    const trendingTvResponse = await fetch(
      `${origin}/api/backendfetch?requestID=trendingTvDay&page=1`,
    );
    if (trendingTvResponse.ok) {
      const trendingTv = await trendingTvResponse.json();
      appendMediaEntries(trendingTv?.results, "tv");
    }
  } catch (error) {
    console.error("Failed to append trending tv shows to sitemap", error);
  }

  CollectionIDs.slice(0, 25).forEach((collection: any) => {
    if (!collection?.id) return;
    dynamicEntries.push({
      loc: `/collections/${collection.id}`,
      changefreq: "monthly",
      priority: "0.6",
    });
  });

  const sitemap = buildXml([...STATIC_ROUTES, ...dynamicEntries]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
