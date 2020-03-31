const uuidv1 = require('uuid/v1');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const csvtojson = require('csvtojson');

const docClient = require('../docClient');
const prompt = require('../prompt');


/**
 * This script should only run once when migrating the goldax data.
 */
(async () => {
  try {
    const {
      env: ENV,
      hash: HASH,
      shouldPurge: PURGE,
    } = await prompt();
    console.log({ ENV, HASH, PURGE });
    if (PURGE) {
      await purgeTable('Hospital', 'id');
    }

    await fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith('.csv'))
      .map(async (file) => {
        const filePath = path.join(__dirname, file);
        const hospitals = (await csvtojson().fromFile(filePath))
          .map(({ name, email, phoneNumber, street, city, state, zipCode, latitude, longitude }) => {
            return {
              __typename: 'Hospital',
              id: uuidv1(),
              name,
              email,
              phoneNumber: phoneNumber.replace(/\D+/g, ''),
              address: {
                street,
                city,
                state,
                zipCode,
              },
              coordinates: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              },
            };
          });
        await writeData('Hospital', hospitals);
      });

    async function writeData(Table, data) {
      const tableName = `${Table}-${HASH}-${ENV}`;
      data = data.map((item) => {
        return Object.assign({
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
        }, item);
      })
      await docClient.batchUpdate(tableName, data, 300);
    }

    async function purgeTable(Table, partitionKey, sortKey) {
      const tableName = `${Table}-${HASH}-${ENV}`;
      const params = {
        TableName: tableName,
      };
      const res = await docClient.scan(params).promise();

      await docClient.batchDelete(tableName, partitionKey, sortKey, res.Items, 300)
      if (res.LastEvaluatedKey) {
        return purgeTable(Table, partitionKey, sortKey)
      }
    }
  } catch (e) {
    console.log(e);
  }
})();
