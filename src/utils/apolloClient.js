import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
//TODO добавить в напоминание https://github.com/zafar-saleem/react-login
//TODO добавить в напоминание https://github.com/strapi/strapi-starter-react-blog
//TODO добавить в напоминание https://formik.org/docs/examples/basic
//TODO добавить в напоминание https://stackworx.github.io/formik-material-ui/docs/guide/getting-started/
//TODO добавить в напоминание https://www.apollographql.com
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
