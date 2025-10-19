import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

const Tv = () => {
  return (
    <>
      <SeoHead
        title="TV Shows"
        canonicalPath="/tv"
        description="Stream the most popular TV series, mini-series, and binge-worthy originals on Aniora. Track episodes, explore new seasons, and stay up to date."
        keywords={[
          "watch tv series",
          "stream tv shows",
          "binge worthy shows",
          "new tv episodes",
          "mini series online",
          "crime dramas",
          "sitcom streaming",
          "reality shows",
          "documentary series",
          "fantasy series",
          "sci-fi shows",
        ]}
      />
      <div>
        <Navbar />
        <CategorywisePage categoryDiv="tv" />
      </div>
    </>
  );
};

export default Tv;
