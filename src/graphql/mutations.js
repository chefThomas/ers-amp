/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createReimbursement = /* GraphQL */ `
  mutation CreateReimbursement(
    $input: CreateReimbursementInput!
    $condition: ModelReimbursementConditionInput
  ) {
    createReimbursement(input: $input, condition: $condition) {
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
export const updateReimbursement = /* GraphQL */ `
  mutation UpdateReimbursement(
    $input: UpdateReimbursementInput!
    $condition: ModelReimbursementConditionInput
  ) {
    updateReimbursement(input: $input, condition: $condition) {
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
export const deleteReimbursement = /* GraphQL */ `
  mutation DeleteReimbursement(
    $input: DeleteReimbursementInput!
    $condition: ModelReimbursementConditionInput
  ) {
    deleteReimbursement(input: $input, condition: $condition) {
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
