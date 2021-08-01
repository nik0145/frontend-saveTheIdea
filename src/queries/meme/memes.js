import { gql } from "@apollo/client";

const MEMES_QUERY = gql`
  query Memes {
    memes {
      id
      created_at
      publish
      users_permissions_user {
        username
      }
      image {
        id
        name
        url
        width
        height
      }
    }
  }
`;

export default MEMES_QUERY;
