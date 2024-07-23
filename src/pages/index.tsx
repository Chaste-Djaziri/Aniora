import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import HomeHero from "@/components/HomeHero";
import HomeListAll from "@/components/HomeListAll";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className={styles.Home}>
      <Navbar />
      <HomeHero />
      <HomeListAll />
    </div>
  );
}
