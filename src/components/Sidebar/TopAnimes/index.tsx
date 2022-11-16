import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import { toogleSidebar } from "../../../recoil-global/atom";
import style from "./topanime.module.css";

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
  title: string;
}

export const TopAnimes = ({ title }: TopAnimes) => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY_ANIMES);
  const [sidebar, setSidebar] = useRecoilState(toogleSidebar);

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  function handleRedirect(url: string) {
    router.push(`/watch/${url}`);
    setSidebar(false);
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
              <div
                onClick={() => handleRedirect(anime.slug)}
                className={style.animeItem}
                key={anime.id}
              >
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
            ))}
      </div>
    </div>
  );
};
