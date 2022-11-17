import { gql } from "@apollo/client";

export const QUERY_ALL_ANIMES = gql`
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

export const QUERY_ANIME_BY_ID = gql`
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

export const QUERY_TOP_ANIMES = gql`
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
