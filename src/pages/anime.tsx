import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";

const Anime = () => {
  return (
    <div>
      <Navbar />
      <CategorywisePage categoryDiv="tv" categoryPage="anime" />
    </div>
  );
};

export default Anime;
