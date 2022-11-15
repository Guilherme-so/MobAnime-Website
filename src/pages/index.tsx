import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { MoonLoader } from "react-spinners";
import style from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const QUERY_ALL_ANIMES = gql`
  {
    animes {
      id
      title
      slug
      description
      thumbnail {
        id
        fileName
        url
      }
      epsodios {
        id
        title
        slug
        ep
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_ALL_ANIMES);
  const [animes, setAnimes] = useState([]);
  // console.log("animes : ", animes);

  useEffect(() => {
    setAnimes(data?.animes);
  }, [data]);

  if (loading) {
    return (
      <div className={style.loading}>
        <MoonLoader color="#5b21b6" />
      </div>
    );
  }

  if (error) {
    return (
      <p>
        Opss... Algo de errado não ta certo, <br />
        Tente Novamente.
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>MobAnime | Home </title>
        <meta content="So mais um site aleatorio de anime." />
      </Head>
      <div className={style.container}>
        <h1>Todos Animes</h1>

        <div className={style.animes}>
          {animes?.map((anime: any) => {
            return (
              <div key={anime.id} className={style.animeItem}>
                <Link href={`/watch/${anime.slug}`} key={anime.id}>
                  <div className={style.image}>
                    <Image
                      src={anime.thumbnail.url}
                      alt={anime.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h1>{anime.title}</h1>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
