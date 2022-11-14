import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
// import ReactPlayer from "react-player";

import style from "../../styles/watch.module.css"

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
  const { data } = useQuery(QUERY_ANIME_BY_ID, { variables: { slug: id } });

  const video =
    typeof window !== "undefined" ? data?.anime.epsodios[0].mp4.url : null;

  return (
    <div className={style.container}>
      {video && (
        <div className={style.videoContainer}>
            <video controls >
            <source
              src={video}
              type="video/webm"
            />
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
          <p>{data?.anime.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Watch;