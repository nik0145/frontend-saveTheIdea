import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;
export default LOGIN_MUTATION;
