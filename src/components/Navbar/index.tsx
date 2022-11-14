import Link from "next/link";
import React, { FormEvent, useState } from "react";
// import { gql, useQuery } from "@apollo/client";
import { MagnifyingGlass } from "phosphor-react";

import style from "./navbar.module.css"

// const QUERY_ANIME_BY_ID = gql`
//   query animeById($title: String!) {
//     anime(where: { title: $title }) {
//       id
//       title
//       description
//       thumbnail {
//         id
//         fileName
//         url
//       }
//     }
//   }
// `;

export const Navbar = () => {
  const [search, setSearch] = useState("");
//   const { data } = useQuery(QUERY_ANIME_BY_ID, {
//     variables: { title: search },
//   });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log(data);
  };

  return (
    <div className={style.navbar}>
      <Link href="/">
        <h1>MobAnime</h1>
      </Link>

      <form onSubmit={handleSubmit} className={style.form}>
        <input
          className={style.input}
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className={style.button}>
          <MagnifyingGlass size={28} />
        </button>
      </form>
    </div>
  );
}