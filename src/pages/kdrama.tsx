import CategorywisePage from "@/components/CategorywisePage";
import Navbar from "@/components/Navbar";

const Tv = () => {
  return <div>
    <Navbar />
    <CategorywisePage categoryDiv="tv" categoryPage="kdrama" />
  </div>;
};

export default Tv;
