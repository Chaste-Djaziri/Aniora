import Head from "next/head";

import {
  DEFAULT_SEO,
  SITE_URL,
  buildCanonicalUrl,
  buildOgImageUrl,
} from "@/lib/seo";

type StructuredData = Record<string, any> | Array<Record<string, any>>;

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article" | "video.movie" | "video.episode" | "profile";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: StructuredData;
}

const SeoHead = ({
  title,
  description,
  keywords,
  canonicalPath = "/",
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  structuredData,
}: SeoHeadProps) => {
  const pageTitle = title
    ? `${title} | ${DEFAULT_SEO.title}`
    : `${DEFAULT_SEO.title} | ${DEFAULT_SEO.tagline}`;

  const pageDescription = description ?? DEFAULT_SEO.description;
  const combinedKeywords = [
    ...(Array.isArray(keywords)
      ? keywords
      : keywords
        ? keywords.split(",").map((keyword) => keyword.trim())
        : []),
    ...DEFAULT_SEO.keywords,
  ]
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const keywordList = Array.from(new Set(combinedKeywords)).join(", ");
  const canonicalUrl = buildCanonicalUrl(canonicalPath);
  const ogImage = buildOgImageUrl(image);

  const schemaPayload =
    structuredData && structuredData !== undefined
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywordList} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={DEFAULT_SEO.title} />
      <meta name="apple-mobile-web-app-title" content={DEFAULT_SEO.title} />
      <meta name="application-name" content={DEFAULT_SEO.title} />
      {publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}
      {noIndex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="bingbot" content="index, follow" />
        </>
      )}
      {schemaPayload.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default SeoHead;
