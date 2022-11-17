import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { QUERY_ANIME_BY_ID } from "../../graphql/queries";
import { CaretDown, CaretUp } from "phosphor-react";
import { MoonLoader } from "react-spinners";

import style from "../../styles/watch.module.css";

function Watch() {
  const {id} = useRouter().query;    
  const { data, loading } = useQuery(QUERY_ANIME_BY_ID, {
    variables: { slug: id }
  });

  const [anime, setAnime] = useState<any>();
  const [acordion, setAcordion] = useState(false);

  useEffect(() => {
    if (data) {
      setAnime(data.anime);

    }
  }, [data, id]);

  let video = typeof window !== "undefined" ? anime?.epsodios[0].mp4.url : null;

  if (loading) {
    return (
      <div className={style.loading}>
        <MoonLoader color="#5b21b6" />
      </div>
    );
  }

  let width = screen.width

  return (
    <>
      <Head>
        <title>MobAnime | {anime?.title} </title>
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
              src={anime?.thumbnail.url}
              alt={anime?.title}
              layout={"fill"}
              objectFit="content"
            />
          </div>
          <div>
            <h1>{anime?.title}</h1>
            <p>
              {acordion
                ? anime?.description
                : width <= 600 ? anime?.description.substring(0, 280) + "..." 
                : anime?.description.substring(0, 500) + "..."   
              }

              {width <= 600 && anime?.description.length >= 280 ? (
                <button onClick={() => setAcordion(!acordion)} className={style.button}>
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
              ): (
                <button onClick={() => setAcordion(!acordion)} className={style.button}>
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
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
