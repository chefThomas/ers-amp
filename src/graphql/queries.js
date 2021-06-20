/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      username
      email
      type
      imageUrl
      reimbursements {
        items {
          id
          amount
          reimbursementType
          description
          userId
          status
          resolvedBy
          imageUrl
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        username
        email
        type
        imageUrl
        reimbursements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReimbursement = /* GraphQL */ `
  query GetReimbursement($id: ID!) {
    getReimbursement(id: $id) {
      id
      amount
      reimbursementType
      description
      userId
      status
      resolvedBy
      imageUrl
      user {
        id
        firstName
        lastName
        username
        email
        type
        imageUrl
        reimbursements {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listReimbursements = /* GraphQL */ `
  query ListReimbursements(
    $filter: ModelReimbursementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReimbursements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        reimbursementType
        description
        userId
        status
        resolvedBy
        imageUrl
        user {
          id
          firstName
          lastName
          username
          email
          type
          imageUrl
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byUsername = /* GraphQL */ `
  query ByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        lastName
        username
        email
        type
        imageUrl
        reimbursements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
