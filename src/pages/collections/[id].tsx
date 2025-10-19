import { useState, useEffect, useMemo } from "react";
import axiosFetch from "@/Utils/fetchBackend";
// import styles from "@/components/CategorywisePage/style.module.scss";
import styles from "@/styles/Search.module.scss";
import MovieCardSmall from "@/components/MovieCardSmall";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import SeoHead from "@/components/SeoHead";
// import MoviePoster from '@/components/MoviePoster';

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Collections = ({ categoryType }: any) => {
  const router = useRouter();
  const [id, setid] = useState<any>(router?.query?.id);
  const [data, setData] = useState<any>([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log({ id: router?.query?.id });
  useEffect(() => {
    setid(router?.query?.id);
  }, [router?.query?.id]);
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else NProgress.done(false);
  }, [loading]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // setData([0, 0, 0, 0, 0, 0, 0, 0, 0]); // for blink loading effect
      try {
        let data;
        data = await axiosFetch({
          requestID: `collection`,
          id: id,
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (id !== undefined && id !== null) fetchData();
  }, [id]);
  const baseImageUrl = process.env.NEXT_PUBLIC_TMBD_IMAGE_URL;
  const posterImage =
    data?.poster_path && baseImageUrl
      ? `${baseImageUrl}${data.poster_path}`
      : undefined;
  const description = data?.overview
    ? `${data.overview.slice(0, 155)}${data.overview.length > 155 ? "…" : ""}`
    : `Explore the ${data?.name || "collection"} playlist on Aniora.`;
  const canonicalPath = id ? `/collections/${id}` : "/collections";
  const keywords = [
    data?.name,
    "movie collection",
    "film saga",
    "franchise marathon",
    "playlist of movies",
    "anthology",
  ].filter(Boolean) as string[];
  const structuredData = useMemo(() => {
    if (!data?.id) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: data?.name,
      description: data?.overview,
      image: posterImage,
    };
  }, [data?.id, data?.name, data?.overview, posterImage]);

  return (
    <>
      <SeoHead
        title={data?.name || "Collection"}
        description={description}
        canonicalPath={canonicalPath}
        image={posterImage}
        keywords={keywords}
        structuredData={structuredData}
      />
      <div className={styles.MoviePage}>
        <h1>{data?.name || data?.title}</h1>
        <div className={styles.movieList}>
          {data?.parts?.map((ele: any) => {
            return (
              <MovieCardSmall
                data={ele}
                media_type={ele?.media_type || "movie"}
              />
            );
          })}
          {data?.length === 0 &&
            dummyList.map((ele) => <Skeleton className={styles.loading} />)}
          {/* {data?.total_results === 0 &&
          <h1>No Data Found</h1>} */}
        </div>
      </div>
    </>
  );
};

export default Collections;
