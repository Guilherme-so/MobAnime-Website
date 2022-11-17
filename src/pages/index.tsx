import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { searchFind } from "../recoil-global/atom";
import { MoonLoader } from "react-spinners";
import { QUERY_ALL_ANIMES } from "../graphql/queries";

import style from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY_ALL_ANIMES);
  const [animes, setAnimes] = useState([]);
  const [animeSerchFind, setAnimeSerchFind] = useRecoilState<any>(searchFind);

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

  const redirectHandler = (url: string) => {
    router.push(`/watch/${url}`);
    setAnimeSerchFind(undefined);
  };

  return (
    <>
      <Head>
        <title>MobAnime | Home </title>
        <meta content="So mais um site aleatorio de anime." />
      </Head>

      {animeSerchFind != undefined || animeSerchFind != null ? (
        <div className={style.container}>
          <h1>Pesquisa: </h1>

          <div className={style.animes}>
            {animeSerchFind.map((anime: any) => {
              return (
                <div key={anime.id} className={style.animeItem}>
                  <div
                    className={style.imageContainer}
                    key={anime.id}
                    onClick={() => redirectHandler(anime.slug)}
                  >
                    <Image
                      className={style.play}
                      src="/images/icon-circled.png"
                      alt="play"
                      width={50}
                      height={50}
                    />
                    <Image
                      src={anime.thumbnail.url}
                      alt={anime.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h1>{anime.title}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <h1>Todos Animes</h1>
          <div className={style.animes}>
            {animes?.map((anime: any) => {
              return (
                <div key={anime.id} className={style.animeItem}>
                  <Link href={`/watch/${anime.slug}`} key={anime.id}>
                    <div className={style.imageContainer}>
                      <Image
                        className={style.play}
                        src="/images/icon-circled.png"
                        alt="play"
                        width={50}
                        height={50}
                      />
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
      )}
    </>
  );
}
