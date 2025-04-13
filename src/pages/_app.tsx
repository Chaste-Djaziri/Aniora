import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import Head from "next/head";
import Script from "next/script";
import { Toaster, toast } from "sonner";
import "@/styles/checkbox.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Router from "next/router";
import { useState, useEffect } from "react";
import NProgress from "nprogress";
import "@/styles/nprogress.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: any) {
  const [isLoading, setIsLoading] = useState(false);
  NProgress.configure({ showSpinner: false });
  const GTag: any = process.env.NEXT_PUBLIC_GT_MEASUREMENT_ID;
  NProgress.configure({
    template: '<div class="bar" role="bar"><div class="peg"></div></div>',
  });

  // Site constants for SEO
  const siteTitle = "Aniora | Free Movie & TV Streaming Platform";
  const siteDescription =
    "Watch thousands of movies, TV shows, anime, K-dramas, animations and more for free. Stream on-demand, create your library, get personalized recommendations. No subscription needed.";
  const siteUrl = "https://aniora.micorp.pro"; // Replace with your actual domain

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  useEffect(() => {
    // Disable context menu
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      toast.info("Context Menu has been disabled");
    };

    // Disable DevTools shortcut (CTRL+SHIFT+I)
    const disableDevToolsShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === "I") || // CTRL+SHIFT+I
        (event.ctrlKey && event.shiftKey && event.key === "J") || // CTRL+SHIFT+J
        (event.ctrlKey && event.shiftKey && event.key === "C") || // CTRL+SHIFT+C
        event.key === "F12" // F12
      ) {
        event.preventDefault();
        toast.info("Dev Tools has been disabled");
      }
    };

    // Add event listeners
    window.addEventListener("contextmenu", disableContextMenu);
    window.addEventListener("keydown", disableDevToolsShortcut);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
      window.removeEventListener("keydown", disableDevToolsShortcut);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="author" content="Micorp" />

        {/* Extensive Keywords - Multiple combinations for better search matching */}
        <meta
          name="keywords"
          content="Aniora, free movies, streaming platform, watch movies online, movie streaming website, free TV shows, anime streaming, K-drama, movie download, HD movies, free movie app, latest movies, online streaming, TV series, action movies, comedy movies, horror movies, drama movies, animation movies, fantasy movies, sci-fi movies, thriller movies, romance movies, family movies, adventure movies, crime movies, documentary, movie library, movie collections, movie recommendations, movie database, free streaming service, entertainment platform, binge-watching, movie night, popular movies, trending shows, classic movies, indie films, blockbuster movies, movie categories, genres, actors, directors, movie search, watch later, continue watching, movie bookmark, personalized recommendations, movie ratings, movie reviews, subtitles, dubbed movies, movie trailers, movie synopsis, movie cast, movie crew, similar movies, related shows, movie premiere, box office, IMDB movies, top rated movies, movie of the week, new releases, movie catalog, movie browser, movie finder, movie explorer, movie discovery, movie hub, movie portal, cinema online, digital movies, web streaming, movie platform, movie archive, movie collection, movie database, watch anywhere, movie watchlist"
        />

        {/* Canonical Link */}
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/images/logo512.png`} />
        <meta property="og:site_name" content="Aniora" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta
          property="twitter:image"
          content={`${siteUrl}/images/logo512.png`}
        />

        {/* App Specific Meta */}
        <meta name="application-name" content="Aniora" />
        <meta name="apple-mobile-web-app-title" content="Aniora" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#f4f7fe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="J0QUeScQSxufPJqGTaszgnI35U2jN98vVWSOkVR4HrI"
        />

        {/* Structured Data - MovieOrganization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Aniora",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              description: siteDescription,
              publisher: {
                "@type": "Organization",
                name: "Micorp",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/images/logo512.png`,
                },
              },
            }),
          }}
        />

        {/* Icons */}
        <link rel="icon" href="/images/logo512.png" />
        <link rel="apple-touch-icon" href="/images/logo512.png" />
        <link rel="shortcut icon" href="/images/logo512.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Additional Meta Tags for SEO */}
        <meta name="rating" content="general" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta http-equiv="content-language" content="en-us" />
      </Head>
      <Layout>
        <Analytics />
        <Toaster
          toastOptions={{
            className: "sooner-toast-desktop",
          }}
          position="bottom-right"
        />
        <Toaster
          toastOptions={{
            className: "sooner-toast-mobile",
          }}
          position="top-center"
        />
        <Tooltip id="tooltip" className="react-tooltip" />
        <Component {...pageProps} />
      </Layout>
      <GoogleAnalytics gaId={GTag} />
      {/* <Script
        disable-devtool-auto
        src="https://cdn.jsdelivr.net/npm/disable-devtool"
      /> */}
    </>
  );
}
