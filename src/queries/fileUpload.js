import { gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      name
    }
  }
`;
const UPLOAD_FILE1 = gql`
  mutation ($file: Upload!, $publish: Boolean, $field: String, $ref: String) {
    upload(file: $file, ref: $ref, field: $field, publish: $publish) {
      _id
      name
      mime
      url
      __typename
    }
  }
`;
export default UPLOAD_FILE;
