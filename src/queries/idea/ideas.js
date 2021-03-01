import gql from "graphql-tag";

const IDEAS_QUERY = gql`
  query Ideas {
    ideas {
      id
      title
      created_at
      description
    }
  }
`;

export default IDEAS_QUERY;
