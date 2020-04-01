/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHospital = /* GraphQL */ `
  subscription OnCreateHospital {
    onCreateHospital {
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
        country
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
export const onUpdateHospital = /* GraphQL */ `
  subscription OnUpdateHospital {
    onUpdateHospital {
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
        country
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
export const onDeleteHospital = /* GraphQL */ `
  subscription OnDeleteHospital {
    onDeleteHospital {
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
        country
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
export const onCreateHospitalAdmin = /* GraphQL */ `
  subscription OnCreateHospitalAdmin {
    onCreateHospitalAdmin {
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
          country
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
export const onUpdateHospitalAdmin = /* GraphQL */ `
  subscription OnUpdateHospitalAdmin($email: String) {
    onUpdateHospitalAdmin(email: $email) {
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
          country
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
export const onDeleteHospitalAdmin = /* GraphQL */ `
  subscription OnDeleteHospitalAdmin {
    onDeleteHospitalAdmin {
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
          country
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
export const onCreateMaker = /* GraphQL */ `
  subscription OnCreateMaker {
    onCreateMaker {
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
        country
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
export const onUpdateMaker = /* GraphQL */ `
  subscription OnUpdateMaker($email: String) {
    onUpdateMaker(email: $email) {
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
        country
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
export const onDeleteMaker = /* GraphQL */ `
  subscription OnDeleteMaker {
    onDeleteMaker {
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
        country
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;
