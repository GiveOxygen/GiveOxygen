import { Auth } from 'aws-amplify';
import request from '../utils/request';
import { getHospitalAdmin, getMaker } from '../graphql/queries';
import { createHospitalAdmin, createHospital, createMaker } from '../graphql/mutations';

export const userSetup = async () => {
  const res = await Auth.currentAuthenticatedUser();
  global.logger.debug(res);
  const {
    sub: userId,
    'custom:role': role,
    'custom:details': details,
    email,
    family_name: lastName,
    given_name: firstName,
    phone_number: phoneNumber,
  } = res.attributes;
  // const groups = res.signInUserSession.accessToken.payload['cognito:groups'];

  if (role === 'hospitalAdmin') {
    const { data: { getHospitalAdmin: result } } = await request(getHospitalAdmin, { email });
    if (!result) {
      const {
        hospitalId: inHospitalId,
        hospitalName,
        hospitalEmail,
        hospitalPhoneNumber,
        hospitalAddress,
        jobTitle,
        coordinates,
      } = JSON.parse(details);

      let hospitalId = inHospitalId;

      if (!hospitalId) {
        if (hospitalAddress.street2 === '') {
          delete hospitalAddress.street2;
        }

        const { data: { createHospital: hospitalData } } = await request(createHospital, {
          input: {
            name: hospitalName,
            email: hospitalEmail,
            phoneNumber: hospitalPhoneNumber,
            address: hospitalAddress,
            coordinates: {
              latitude: coordinates[0],
              longitude: coordinates[1],
            },
          },
        });
        hospitalId = hospitalData.id;
      }

      await request(createHospitalAdmin, {
        input: {
          email,
          id: userId,
          firstName,
          lastName,
          phoneNumber,
          jobTitle: jobTitle,
          hospitalId,
        },
      });
    }
  } else
  if (role === 'maker') {
    const { data: { getMaker: result } } = await request(getMaker, { email });
    if (!result) {
      const {
        address,
        jobTitle,
        coordinates,
      } = JSON.parse(details);
      if (address.street2 === '') {
        delete address.street2;
      }
      await request(createMaker, {
        input: {
          email,
          id: userId,
          firstName,
          lastName,
          phoneNumber,
          jobTitle,
          address,
          coordinates: {
            latitude: coordinates[0],
            longitude: coordinates[1],
          },
        },
      });
    }
  }
};
