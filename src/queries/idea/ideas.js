import { gql } from "@apollo/client";

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
