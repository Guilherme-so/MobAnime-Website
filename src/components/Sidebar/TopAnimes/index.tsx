import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { toogleSidebar } from "../../../recoil-global/atom";
import { QUERY_TOP_ANIMES } from "../../../graphql/queries";

import style from "./topanime.module.css";

interface TopAnimes {
  title: string;
}

export const TopAnimes = ({ title }: TopAnimes) => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY_TOP_ANIMES);
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
                    height={60}
                    width={46}
                    layout="fixed"
                  />
                </div>
                <div>
                  <h1>{anime.title}</h1>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
