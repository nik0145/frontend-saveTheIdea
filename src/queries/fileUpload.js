import { gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation ($file: Upload!, $ref: String) {
    upload(file: $file, ref: $ref) {
      _id
      name
      mime
      url
      __typename
    }
  }
`;
export default UPLOAD_FILE;
