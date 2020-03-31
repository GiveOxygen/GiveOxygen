const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const { Parser } = require('json2csv');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'amplify-giveoxygen' });
AWS.config.credentials = credentials;
const client = new AWS.SecretsManager({ region: 'us-east-1' });

(async () => {
  const { SecretString } = await client.getSecretValue({ SecretId: 'giveoxygen' }).promise();
  const { GOOGLE_MAP_APIKEY_BACKEND } = JSON.parse(SecretString);
  console.log(GOOGLE_MAP_APIKEY_BACKEND);
  await fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.csv'))
    .map(async (file) => {
      const filePath = path.join(__dirname, file);
      const hospitals = await csvtojson().fromFile(filePath);

      const updatePromises = await hospitals
        // .filter((i, index) => index === 0)
        .map(async (hospital) => {
          if (hospital.email === '') {
            hospital.email = 'unknown@hospital.org';
          }
          if (hospital.latitude === '' || hospital.longitude === '') {
            const { street, city, state } = hospital;
            const addressString = [street, city, state].filter((i) => i).join(',').replace(/ /g, '+');
            const googleGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${GOOGLE_MAP_APIKEY_BACKEND}`;
            const { data: { results } } = await axios.get(googleGeoUrl);
            const { geometry: { location: { lat, lng } } } = results[0];
            hospital.latitude = lat;
            hospital.longitude = lng;
          }
        });

      await Promise.all(updatePromises);

      const parser = new Parser({
        fields: Object.keys(hospitals[0]),
        quote: '',
      });
      const csv = parser.parse(hospitals);
      fs.writeFileSync(filePath, csv, 'utf8');
    });
})();
