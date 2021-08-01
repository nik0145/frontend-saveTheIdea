import { gql } from "@apollo/client";

const DELETE_MEME = gql`
  mutation deleteMeme($id: ID!) {
    deleteMeme(input: { where: { id: $id } }) {
      meme {
        id
      }
    }
  }
`;
export default DELETE_MEME;
