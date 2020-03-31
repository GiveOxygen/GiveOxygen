/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHospitalAdmin = /* GraphQL */ `
  query GetHospitalAdmin($email: String!) {
    getHospitalAdmin(email: $email) {
      email
      firstName
      lastName
      phoneNumber
      createdAt
      updatedAt
      hospitalId
      jobTitle
      hospital {
        id
        name
        description
        note
        email
        phoneNumber
        createdAt
        updatedAt
        address {
          street
          street2
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
        admins {
          nextToken
        }
      }
    }
  }
`;
export const listHospitalAdmins = /* GraphQL */ `
  query ListHospitalAdmins(
    $email: String
    $filter: ModelHospitalAdminFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHospitalAdmins(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        firstName
        lastName
        phoneNumber
        createdAt
        updatedAt
        hospitalId
        jobTitle
        hospital {
          id
          name
          description
          note
          email
          phoneNumber
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getAdminsByHospitalByCreatedAt = /* GraphQL */ `
  query GetAdminsByHospitalByCreatedAt(
    $hospitalId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHospitalAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAdminsByHospitalByCreatedAt(
      hospitalId: $hospitalId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        email
        firstName
        lastName
        phoneNumber
        createdAt
        updatedAt
        hospitalId
        jobTitle
        hospital {
          id
          name
          description
          note
          email
          phoneNumber
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listHospitals = /* GraphQL */ `
  query ListHospitals(
    $filter: ModelHospitalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        note
        email
        phoneNumber
        createdAt
        updatedAt
        address {
          street
          street2
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
        admins {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getHospital = /* GraphQL */ `
  query GetHospital($id: ID!) {
    getHospital(id: $id) {
      id
      name
      description
      note
      email
      phoneNumber
      createdAt
      updatedAt
      address {
        street
        street2
        city
        state
        zipCode
      }
      coordinates {
        latitude
        longitude
      }
      admins {
        items {
          email
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          hospitalId
          jobTitle
        }
        nextToken
      }
    }
  }
`;
export const getMaker = /* GraphQL */ `
  query GetMaker($email: String!) {
    getMaker(email: $email) {
      email
      firstName
      lastName
      phoneNumber
      createdAt
      updatedAt
      jobTitle
      address {
        street
        street2
        city
        state
        zipCode
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
export const listMakers = /* GraphQL */ `
  query ListMakers(
    $email: String
    $filter: ModelMakerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMakers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        firstName
        lastName
        phoneNumber
        createdAt
        updatedAt
        jobTitle
        address {
          street
          street2
          city
          state
          zipCode
        }
        coordinates {
          latitude
          longitude
        }
      }
      nextToken
    }
  }
`;
