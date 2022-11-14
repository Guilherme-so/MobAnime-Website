import Link from "next/link";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import style from "./topanime.module.css"

const QUERY_ANIMES = gql`
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

interface TopAnimes {
    title: string
}

export const TopAnimes = ({ title }: TopAnimes) => {
  const { data, loading } = useQuery(QUERY_ANIMES);

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div>
        <h1>{title}</h1>
      </div>

      <div>
        {data.animes.map(
          (anime: any, index: any) =>
            index < 5 && (
              <Link href={`/watch/${anime.slug}`} key={anime.id}>
                <div className={style.animeItem}>
                  <div>
                    <Image
                      src={anime.thumbnail.url}
                      alt={anime.title}
                      height={80}
                      width={80}
                      layout="fixed"
                    />
                  </div>
                  <div>
                    <h1>{anime.title}</h1>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};
