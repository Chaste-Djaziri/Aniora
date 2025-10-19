import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

const Animation = () => {
  // return <CategorywisePage categoryDiv="tv" categoryPage="animation" />;
  return (
    <>
      <SeoHead
        title="Animation Collection"
        canonicalPath="/animation"
        description="Animated adventures, family favourites, and cartoon classics are coming soon to Aniora. Search now to stream from our animation catalogue."
        keywords={[
          "animation streaming",
          "animated movies",
          "cartoon shows",
          "family animation",
          "pixar movies",
          "disney classics",
          "anime films",
          "animated series",
        ]}
      />
      <div>
        <Navbar />
        <h1>
          Page not available yet, still under constraction,
          <br /> but fell free to just search any animation you want, we have
          all that you need.
        </h1>
      </div>
    </>
  );
};

export default Animation;
