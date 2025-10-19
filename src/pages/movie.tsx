import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";
import SeoHead from "@/components/SeoHead";

const Movie = () => {
  return (
    <>
      <SeoHead
        title="Movies"
        canonicalPath="/movie"
        description="Browse blockbuster films, hidden gems, and curated collections on Aniora. Filter by genre, country, or release year to find your next movie night pick."
        keywords={[
          "watch movies",
          "stream hd movies",
          "new movie releases",
          "box office hits",
          "oscar movies online",
          "free movie streaming",
          "action movies online",
          "romantic movies",
          "horror movies",
          "family films",
          "indie films",
        ]}
      />
      <div>
        <Navbar />
        <CategorywisePage categoryDiv="movie" />
      </div>
    </>
  );
};

export default Movie;
