/* eslint-disable-line */
const aws = require('aws-sdk');
const https = require('https');
const client = new aws.SecretsManager({ region: 'us-east-1' });

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
    req.on('error', reject);
    req.end();
  });
};

exports.handler = async (event, context, callback) => {
  console.log(event);

  const role = event.request.userAttributes['custom:role'];
  const details = JSON.parse(event.request.userAttributes['custom:details']);

  let groupName;
  if (role === 'hospitalAdmin') {
    groupName = 'HospitalAdmins';
  } else
  if (role === 'maker') {
    groupName = 'Makers';
  }

  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
  const groupParams = {
    GroupName: groupName,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    GroupName: groupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  // secret manager
  const data = await client.getSecretValue({ SecretId: 'giveoxygen' }).promise();
  let secret;
  if ('SecretString' in data) {
    secret = data.SecretString;
  } else {
    const buff = new Buffer(data.SecretBinary, 'base64');
    secret = buff.toString('ascii');
  }
  const { GOOGLE_MAP_APIKEY_BACKEND } = JSON.parse(secret);
  const { street, street2, city, state, country } = details.address || details.hospitalAddress;
  const addressString = [street, street2, city, state, country].filter((i) => i).join(',').replace(/ /g, '+');
  const googleGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${GOOGLE_MAP_APIKEY_BACKEND}`;
  console.log(googleGeoUrl);
  const { results } = await makeRequest(googleGeoUrl);
  if (results.length > 0) {
    console.log(results[0]);
    const { geometry: { location: { lat, lng } } } = results[0];
    details.coordinates = [lat, lng];
  } else {
    details.coordinates = [0, 0];
  }
  const updateAttributesParams = {
    UserAttributes: [{
      Name: 'custom:details',
      Value: JSON.stringify(details),
    }],
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  await cognitoidentityserviceprovider.adminUpdateUserAttributes(updateAttributesParams).promise();

  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }

  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};
