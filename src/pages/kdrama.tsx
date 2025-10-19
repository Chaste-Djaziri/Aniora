import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

const KDrama = () => {
  return (
    <>
      <SeoHead
        title="K-Drama Spotlight"
        canonicalPath="/kdrama"
        description="Watch the latest Korean dramas, romantic comedies, and thrillers on Aniora. Filter by trending shows or newest releases to keep up with Hallyu."
        keywords={[
          "kdrama streaming",
          "watch korean dramas",
          "latest kdrama episodes",
          "romantic kdrama",
          "kdrama thriller",
          "kdrama romance",
          "kdrama comedy",
          "hallyu shows",
        ]}
      />
      <div>
        <Navbar />
        <CategorywisePage categoryDiv="tv" categoryPage="kdrama" />
      </div>
    </>
  );
};

export default KDrama;
