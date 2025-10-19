import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Detail.module.scss";
import MetaDetails from "@/components/MetaDetails";
import Carousel from "@/components/Carousel";
import axiosFetch from "@/Utils/fetchBackend";
import MoviePoster from "@/components/MoviePoster";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { BsShare } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { navigatorShare } from "@/Utils/share";
import SeoHead from "@/components/SeoHead";

const PersonPage = () => {
  const params = useSearchParams();
  const [type, setType] = useState<string | null>("person");
  const [id, setId] = useState<string | null>(params.get("id"));
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<any>([]);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setId(params.get("id"));

    const fetchData = async () => {
      try {
        const data = await axiosFetch({ requestID: `${type}Data`, id: id });
        setData(data);
        const res = await axiosFetch({ requestID: `${type}Data`, id: id });
        setData(res);
        console.log({ res });

        const response = await axiosFetch({
          requestID: `${type}Images`,
          id: id,
        });
        // setImages(response.results);
        let arr: any = [];
        response.profiles.map((ele: any, i: any) => {
          if (i < 10)
            arr.push(process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.file_path);
        });
        if (arr.length === 0) arr.push("/images/logo.svg");
        setImages(arr);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    if (id !== undefined && id !== null) {
      fetchData();
    }
  }, [params, id]);

  const handleShare = () => {
    const url = `/person?id=${id}`;
    navigatorShare({ text: data?.name, url: url });
  };

  const pageTitle =
    data?.name && data?.name !== "" ? data.name : "Person Profile";
  const baseImageUrl = process.env.NEXT_PUBLIC_TMBD_IMAGE_URL;
  const profileImage =
    data?.profile_path && baseImageUrl
      ? `${baseImageUrl}${data.profile_path}`
      : undefined;
  const biography = data?.biography?.trim();
  const description =
    biography && biography.length > 0
      ? `${biography.slice(0, 155)}${biography.length > 155 ? "…" : ""}`
      : `Explore ${pageTitle}'s filmography, biography, and credits on Aniora.`;
  const canonicalPath = id ? `/person?id=${id}` : "/person";
  const keywords = [
    data?.name,
    "actor profile",
    "actress profile",
    "celebrity biography",
    "movie credits",
    "tv cast",
    "filmography",
  ].filter(Boolean) as string[];
  const structuredData = useMemo(() => {
    if (!data?.id) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: data?.name,
      description: biography,
      image: profileImage,
      birthDate: data?.birthday || undefined,
      url: canonicalPath,
      sameAs: [
        data?.homepage || undefined,
        data?.imdb_id
          ? `https://www.imdb.com/name/${data?.imdb_id}`
          : undefined,
      ].filter(Boolean),
    };
  }, [
    data?.id,
    data?.name,
    biography,
    profileImage,
    data?.birthday,
    data?.homepage,
    data?.imdb_id,
    canonicalPath,
  ]);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={description}
        canonicalPath={canonicalPath}
        image={profileImage}
        type="profile"
        keywords={keywords}
        structuredData={structuredData}
      />
      <div className={`${styles.DetailPage} ${styles.PersonPage}`}>
        <div className={`${styles.biggerPic} ${styles.detailBiggerPic}`}>
          {images.length > 0 ? (
            <Carousel
              imageArr={images}
              setIndex={setIndex}
              mobileHeight="60vh"
              desktopHeight="95vh"
              objectFit={"contain"}
            />
          ) : (
            <Skeleton className={styles.CarouselLoading} />
          )}
          <div className={styles.DetailBanner}>
            <div className={styles.curvy5}></div>
            <div className={styles.HomeHeroMeta} key={data?.id}>
              <h1
                data-tooltip-id="tooltip"
                data-tooltip-content={data?.name || "name"}
              >
                {data?.name || <Skeleton />}
              </h1>
              <div className={styles.HomeHeroMetaRow2}>
                <p className={styles.type}>{data?.known_for_department}</p>
                {data?.homepage !== null ? (
                  <Link
                    href={data?.homepage || "#"}
                    target="_blank"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Homepage"
                  >
                    <CgWebsite />
                  </Link>
                ) : null}
                {data ? (
                  <>
                    <BsShare
                      onClick={handleShare}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Share"
                    />
                  </>
                ) : (
                  <div>
                    <Skeleton width={200} count={1} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.biggerDetail}>
          <MetaDetails id={id} type={type} data={data} />
        </div>
      </div>
    </>
  );
};

export default PersonPage;
