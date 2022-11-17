import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchFind, searchState, toogleSidebar } from "../../recoil-global/atom";
import { useQuery } from "@apollo/client";
import { List, MagnifyingGlass, MagnifyingGlassMinus, X } from "phosphor-react";
import { QUERY_ALL_ANIMES } from "../../graphql/queries";

import style from "./navbar.module.css";

export const Navbar = () => {
  const router = useRouter();
  const [sidebarToogler, setSidebarToogler] = useRecoilState(toogleSidebar);
  const [searchVisibility, setSearchVisibility] = useRecoilState(searchState);
  const setFindAnime = useSetRecoilState(searchFind)
  const setAnimeSerchFind = useSetRecoilState<any>(searchFind);

  const { data } = useQuery(QUERY_ALL_ANIMES);
  const [allAnimes, setAllAnimes] = useState<any>([]);
  const [animesFiltered, setAnimesFiltered] = useState<any>([]);
  const [search, setSearch] = useState("");

  // -------------------------------------------------------
  // Busca Funcão
  function testaBusca(name: string) {
    const regex = new RegExp(search, "i");
    return regex.test(name);
  }

  useEffect(() => {
    const novaListaDeAnime = allAnimes.filter((item: any) =>
      testaBusca(item.title)
    );
    setAnimesFiltered(novaListaDeAnime);
  }, [search]);
  // ------------------------------------------------------

  useEffect(() => {
    if (data) {
      setAllAnimes(data.animes);
    }
  }, [data]);

  function handleRedirect(url: string) {
    router.push(`/watch/${url}`);
    setSearch("");
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const findAnime = allAnimes.filter((item: any) =>
    testaBusca(item.title))
    setFindAnime(findAnime)
    setSearchVisibility(false)
    setSearch("")
  };



  return (
    <div className={style.navbar}>
      <div className={style.navbarWrapper}>
        <Link href="/" onClick={()=> setAnimeSerchFind(undefined)}>
          <h1>MobAnime</h1>
        </Link>

        <form onSubmit={handleSubmit} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className={style.button}>
            <MagnifyingGlass size={28} />
          </button>
        </form>

        {search && animesFiltered && (
          <div className={style.resultBoxDextop}>
            {animesFiltered?.map((animesDaBusca: any) => (
              <div
                onClick={() => handleRedirect(animesDaBusca.slug)}
                key={animesDaBusca.id}
                className={style.resultItemDextop}
              >
                <div className={style.imageContainer}>
                  <Image
                    src={animesDaBusca.thumbnail.url}
                    alt={animesDaBusca.title}
                    width={40}
                    height={40}
                  />
                </div>
                <p>{animesDaBusca.title}</p>
              </div>
            ))}
          </div>
        )}

        <div className={style.buttonsWrapper}>
          <button 
            className={style.toogleSidebar}
          onClick={() => setSearchVisibility(!searchVisibility)}>
            {searchVisibility ? (
              <MagnifyingGlassMinus color="#4C1D95" size={28} />
            ) : (
              <MagnifyingGlass color="#4C1D95" size={28} />
            )}

          </button>

          <button
            className={style.toogleSidebar}
            onClick={() => setSidebarToogler(!sidebarToogler)}
          >
            {sidebarToogler ? (
              <X size={28} color="#4C1D95" />
            ) : (
              <List size={28} color="#4C1D95" />
            )}
          </button>
        </div>
      </div>

      {searchVisibility && (
        <form onSubmit={handleSubmit} className={style.searchMobile}>
          <input
            className={style.input}
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <button className={style.button}>
            <MagnifyingGlass size={28} />
          </button>
        </form>
      )}

      {search && animesFiltered && searchVisibility && (
        <div className={style.resultBox}>
          {animesFiltered?.map((animesDaBusca: any) => (
            <div
              onClick={() => handleRedirect(animesDaBusca.slug)}
              key={animesDaBusca.id}
              className={style.resultItem}
            >
              <div className={style.imageContainer}>
                <Image
                  src={animesDaBusca.thumbnail.url}
                  alt={animesDaBusca.title}
                  width={40}
                  height={40}
                />
              </div>
              <p>{animesDaBusca.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
