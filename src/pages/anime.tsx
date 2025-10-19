import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

const Anime = () => {
  return (
    <>
      <SeoHead
        title="Anime Hub"
        canonicalPath="/anime"
        description="Dive into subbed and dubbed anime series with fast episodes, seasonal simulcasts, and personalised watchlists on Aniora."
        keywords={[
          "watch anime",
          "anime streaming",
          "subbed anime",
          "dubbed anime",
          "weekly anime episodes",
          "shonen anime",
          "shojo anime",
          "isekai anime",
          "anime movies",
          "anime collections",
        ]}
      />
      <div>
        <Navbar />
        <CategorywisePage categoryDiv="tv" categoryPage="anime" />
      </div>
    </>
  );
};

export default Anime;
