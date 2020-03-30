/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHospital = /* GraphQL */ `
  mutation CreateHospital(
    $input: CreateHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    createHospital(input: $input, condition: $condition) {
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
export const updateHospital = /* GraphQL */ `
  mutation UpdateHospital(
    $input: UpdateHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    updateHospital(input: $input, condition: $condition) {
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
export const deleteHospital = /* GraphQL */ `
  mutation DeleteHospital(
    $input: DeleteHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    deleteHospital(input: $input, condition: $condition) {
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
export const createHospitalAdmin = /* GraphQL */ `
  mutation CreateHospitalAdmin(
    $input: CreateHospitalAdminInput!
    $condition: ModelHospitalAdminConditionInput
  ) {
    createHospitalAdmin(input: $input, condition: $condition) {
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
export const updateHospitalAdmin = /* GraphQL */ `
  mutation UpdateHospitalAdmin(
    $input: UpdateHospitalAdminInput!
    $condition: ModelHospitalAdminConditionInput
  ) {
    updateHospitalAdmin(input: $input, condition: $condition) {
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
export const deleteHospitalAdmin = /* GraphQL */ `
  mutation DeleteHospitalAdmin(
    $input: DeleteHospitalAdminInput!
    $condition: ModelHospitalAdminConditionInput
  ) {
    deleteHospitalAdmin(input: $input, condition: $condition) {
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
export const createMaker = /* GraphQL */ `
  mutation CreateMaker(
    $input: CreateMakerInput!
    $condition: ModelMakerConditionInput
  ) {
    createMaker(input: $input, condition: $condition) {
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
export const updateMaker = /* GraphQL */ `
  mutation UpdateMaker(
    $input: UpdateMakerInput!
    $condition: ModelMakerConditionInput
  ) {
    updateMaker(input: $input, condition: $condition) {
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
export const deleteMaker = /* GraphQL */ `
  mutation DeleteMaker(
    $input: DeleteMakerInput!
    $condition: ModelMakerConditionInput
  ) {
    deleteMaker(input: $input, condition: $condition) {
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
