import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { CaretDown, CaretUp } from "phosphor-react";
import { MoonLoader } from "react-spinners";

import style from "../../styles/watch.module.css";

const QUERY_ANIME_BY_ID = gql`
  query animeById($slug: String!) {
    anime(where: { slug: $slug }) {
      id
      title
      description
      thumbnail {
        id
        fileName
        url
      }
      epsodios {
        title
        ep
        mp4 {
          id
          url
        }
      }
    }
  }
`;

function Watch() {
  const router = useRouter();
  const { id } = router.query;
  const [acordion, setAcordion] = useState(false);
  const { data, loading } = useQuery(QUERY_ANIME_BY_ID, {
    variables: { slug: id },
  });

  const video =
    typeof window !== "undefined" ? data?.anime.epsodios[0].mp4.url : null;

  if (loading) {
    return (
      <div className={style.loading}>
        <MoonLoader color="#5b21b6" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MobAnime | {data?.anime.title} </title>
        <meta content="So mais um site aleatorio de anime." />
      </Head>
      <div className={style.container}>
        {video && (
          <div className={style.videoContainer}>
            <video controls>
              <source src={video} type="video/webm" />
            </video>
          </div>
        )}

        <div className={style.detailAnime}>
          <div className={style.image}>
            <Image
              src={data?.anime.thumbnail.url}
              alt={data?.anime.title}
              layout={"fill"}
              objectFit="content"
            />
          </div>
          <div>
            <h1>{data?.anime.title}</h1>
            <p>
              {acordion
                ? data?.anime.description
                : data?.anime.description.substring(0, 500) + "..."}
              {data?.anime.description.length >= 500 ? (
                <button
                  onClick={() => setAcordion(!acordion)}
                  className={style.button}
                >
                  {acordion ? (
                    <span>
                      Menos <CaretUp size={20} />
                    </span>
                  ) : (
                    <span>
                      Mais <CaretDown size={20} />
                    </span>
                  )}
                </button>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
