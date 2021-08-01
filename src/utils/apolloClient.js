// import {
//   HttpLink,
//   ApolloLink,
// } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "../constants";
//TODO добавить в напоминание https://github.com/zafar-saleem/react-login
//TODO добавить в напоминание https://github.com/strapi/strapi-starter-react-blog
//TODO добавить в напоминание https://formik.org/docs/examples/basic
//TODO добавить в напоминание https://stackworx.github.io/formik-material-ui/docs/guide/getting-started/
//TODO добавить в напоминание https://www.apollographql.com
const cache = new InMemoryCache();

// const httpLink = new HttpLink({
//   uri: `${process.env.REACT_APP_API_URL}/graphql`,
// });
const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
})
//?createUploadLink работает как обычный линк для запросов и загрузки
const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});
const client = new ApolloClient({
  // link: ApolloLink.from([httpLink, uploadLink]),
  link: authLink.concat(uploadLink),
  cache,
});

export default client;
