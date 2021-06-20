/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateReimbursement = /* GraphQL */ `
  subscription OnCreateReimbursement {
    onCreateReimbursement {
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
export const onUpdateReimbursement = /* GraphQL */ `
  subscription OnUpdateReimbursement {
    onUpdateReimbursement {
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
export const onDeleteReimbursement = /* GraphQL */ `
  subscription OnDeleteReimbursement {
    onDeleteReimbursement {
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
