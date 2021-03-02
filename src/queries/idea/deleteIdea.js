import { gql } from "@apollo/client";

const DELETE_IDEA = gql`
  mutation deleteIdea($id: ID!) {
    deleteIdea(input: { where: { id: $id } }) {
      idea {
        id
      }
    }
  }
`;
export default DELETE_IDEA;

