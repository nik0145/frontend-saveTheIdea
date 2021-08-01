import { gql } from "@apollo/client";

// image: ID;
// users_permissions_user: ID;
// tags: [ID];
// publish: Boolean;
const ADD_MEME = gql`
  mutation createMeme($image: ID!, $publish: Boolean!,$users_permissions_user:ID!) {
    createMeme(input: { data: { image: $image, publish: $publish, users_permissions_user: $users_permissions_user } }) {
      meme {
        id
      }
    }
  }
`;
export default ADD_MEME;
