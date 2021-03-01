import { gql } from "@apollo/client";

const ADD_IDEA = gql`
  mutation createIdea($title: String!, $description: String!) {
    createIdea(input: { data: { title: $title, description: $description } }) {
      idea{
          id
      }
    }
  }
`;
export default ADD_IDEA;