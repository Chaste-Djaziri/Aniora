import type { GetServerSideProps } from "next";

import { buildCanonicalUrl } from "@/lib/seo";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemapUrl = buildCanonicalUrl("/sitemap.xml");

  const body = `User-agent: *\nAllow: /\nDisallow: /library\nDisallow: /login\nDisallow: /signup\nDisallow: /settings\nDisallow: /recommendation\nDisallow: /_offline\nSitemap: ${sitemapUrl}`;

  res.setHeader("Content-Type", "text/plain");
  res.write(body);
  res.end();

  return { props: {} };
};

export default Robots;
