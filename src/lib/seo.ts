export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aniora.micorp.pro";

export const DEFAULT_SEO = {
  title: "Aniora",
  tagline: "Your personal movie & TV streaming oasis",
  description:
    "Stream the latest movies, TV series, anime, and k-dramas on Aniora. Enjoy fast, ad-lite streams, curated collections, downloads, and personalized watchlists for free.",
  keywords: [
    "Aniora",
    "movie streaming",
    "tv streaming",
    "free movies online",
    "watch movies online",
    "watch tv shows online",
    "anime streaming",
    "kdrama streaming",
    "film streaming",
    "HD streaming",
    "4K streaming",
    "ad free streaming",
    "movie downloads",
    "torrent streaming",
    "latest movies",
    "latest tv shows",
    "top rated movies",
    "popular movies",
    "popular tv shows",
    "new episodes online",
    "movie collections",
    "curated playlists",
    "cinematic universe",
    "home cinema",
    "online cinema",
    "family movies",
    "action movies",
    "romance movies",
    "thriller movies",
    "sci-fi movies",
    "fantasy series",
    "documentary streaming",
    "anime episodes",
    "dubbed anime",
    "subbed anime",
    "korean drama",
    "japanese drama",
    "animated films",
    "cartoon streaming",
    "OTT alternative",
    "free OTT platform",
    "PWA streaming app",
    "movie watchlist",
    "continue watching",
    "personalised recommendations",
    "Aniora streaming",
    "Aniora movies",
    "Aniora tv shows",
    "Aniora anime",
    "Aniora free streaming",
    "Aniora hd streaming",
    "Aniora online",
    "Aniora Rivestream",
    "Aniora watchlist",
    "Aniora continue watching",
    "Aniora downloads",
    "Aniora curated collections",
    "Aniora personalized recommendations",
    "Aniora kdrama",
    "Aniora trending movies",
    "Aniora trending shows",
    "Aniora fast player",
    "Aniora subtitles",
    "Aniora dubbed anime",
    "Aniora subbed anime",
    "Aniora simulcast",
    "Aniora ad lite streaming",
    "Aniora mobile streaming",
    "Aniora PWA",
    "Aniora Micorp",
    "watch movies on Aniora",
    "stream tv shows Aniora",
    "watch anime free Aniora",
    "download movies Aniora",
    "Aniora ad free streaming",
    "Aniora library",
    "Aniora recommendations page",
    "Aniora sitemap",
    "Aniora robots",
    "Aniora google verification",
  ],
  image: "/images/logo512.png",
  twitterHandle: "@Aniora",
};

export const buildCanonicalUrl = (path: string = "/") => {
  try {
    const normalizedPath = path.startsWith("http")
      ? path
      : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    return new URL(normalizedPath).toString();
  } catch (error) {
    return `${SITE_URL}/`;
  }
};

export const buildOgImageUrl = (image?: string) => {
  if (!image) return buildCanonicalUrl(DEFAULT_SEO.image);
  if (image.startsWith("http")) return image;
  return buildCanonicalUrl(image);
};
