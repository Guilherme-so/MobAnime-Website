import { InMemoryCache,ApolloClient} from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URL,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH}`
    },
    cache: new InMemoryCache()
  })