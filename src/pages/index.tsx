import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import HomeHero from "@/components/HomeHero";
import HomeListAll from "@/components/HomeListAll";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead
        title="Home"
        canonicalPath="/"
        description="Discover trending movies, top TV shows, anime, and k-dramas curated for you on Aniora. Start streaming instantly and build your personal watchlist."
        keywords={[
          "stream new movies",
          "latest tv episodes",
          "trending anime",
          "popular kdrama",
          "recommended movies",
          "upcoming releases",
          "movie night picks",
        ]}
      />
      <div className={styles.Home}>
        <Navbar />
        <HomeHero />
        <HomeListAll />
      </div>
    </>
  );
}
