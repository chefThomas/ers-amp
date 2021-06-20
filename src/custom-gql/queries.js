export const login = /* GraphQL */ `
  query ByUsername(
    $username: String
  ) {
    byUsername(
      username: $username

    ) {
      items {
        id
        username
        email
        password
        type
      }

    }
  }
`;

export const listReimbursementsByUser = /* GraphQL */`
  query ListReimbursementsByUserId(
    $userId: ID) {
  listReimbursements(filter: {userId:{ eq: $userId}}) {
    items {
      reimbursementType
      createdAt
      amount
      description
      id
      resolvedBy
      status
      updatedAt
      userId
    }
  }
}
`

// query GetPost( $postId: Int! ) {
//   getPost( id: $postId ) {
//     id
//     title
//   }
// }