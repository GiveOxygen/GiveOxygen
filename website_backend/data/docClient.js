const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({ profile: 'amplify-giveoxygen' });
AWS.config.credentials = credentials;
const config = {
  region: 'us-east-1',
};
const docClient = new AWS.DynamoDB.DocumentClient(config);

module.exports = docClient;

docClient.queryAll = (inParams, inPreviousItems = []) => {
  return docClient.query(inParams).promise()
    .then((res) => {
      const { Items, LastEvaluatedKey } = res;
      if (LastEvaluatedKey) {
        inParams.ExclusiveStartKey = LastEvaluatedKey;
        return docClient.queryAll(inParams, Items);
      } else {
        return Items;
      }
    })
    .then((items) => {
      return [...items, ...inPreviousItems];
    });
};

docClient.scanAll = (inParams, inPreviousItems = []) => {
  return docClient.scan(inParams).promise()
    .then((res) => {
      const { Items, LastEvaluatedKey } = res;
      if (LastEvaluatedKey) {
        inParams.ExclusiveStartKey = LastEvaluatedKey;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            return docClient.scanAll(inParams, Items).then(resolve).catch(reject);
          }, 500);
        });
      } else {
        return Items;
      }
    })
    .then((items) => {
      return [...items, ...inPreviousItems];
    });
};

docClient.batchUpdate = (inTableName, inData = [], inBatchUpdateInterval = 2000, inPrimaryKey = null, inSortKey = null) => {
  return batchAction(inTableName, 'PutRequest', inPrimaryKey, inSortKey, inData, inBatchUpdateInterval);
};

docClient.batchDelete = (inTableName, inPrimaryKey, inSortKey, inData = [], inBatchUpdateInterval = 2000) => {
  return batchAction(inTableName, 'DeleteRequest', inPrimaryKey, inSortKey, inData, inBatchUpdateInterval);
};

/**
 * batchAction
 * @param {*} inTableName
 * @param {*} inRequestAction
 * @param {*} inPrimaryKey
 * @param {*} inSortKey
 * @param {*} inData
 * @param {*} inBatchUpdateInterval
 * @return {Promise}
 */
function batchAction(inTableName, inRequestAction, inPrimaryKey, inSortKey, inData, inBatchUpdateInterval = 2000) {
  const maxItemsInBatch = 24;
  let startIndex = 0;
  let endIndex = maxItemsInBatch;
  if (endIndex > inData.length) {
    endIndex = inData.length;
  }
  const tasks = [];
  while (endIndex <= inData.length && startIndex !== endIndex) {
    const toModifyData = [];
    for (let index = startIndex; index < endIndex; index++) {
      if (index >= inData.length) {
        break;
      }
      const item = inData[index];
      const modifyRequest = {
        [inRequestAction]: {},
      };
      switch (inRequestAction) {
      case 'PutRequest':
        modifyRequest[inRequestAction].Item = item;
        break;
      default:
        modifyRequest[inRequestAction].Key = {
          [inPrimaryKey]: item[inPrimaryKey],
        };
        break;
      }
      if (inSortKey) {
        modifyRequest[inRequestAction].Key[inSortKey] = item[inSortKey];
      }
      toModifyData.push(modifyRequest);
    }
    const params = {
      RequestItems: {
        [inTableName]: toModifyData,
      },
    };

    startIndex = endIndex;
    endIndex += maxItemsInBatch;
    if (endIndex > inData.length) {
      endIndex = inData.length;
    }
    tasks.push(params);
  }
  return tasks.reduce((chainPromise, taskParams) => {
    return chainPromise
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            return docClient.batchWrite(taskParams).promise()
              .then(resolve)
              .catch((err) => {
                return reject(new Error({
                  params: taskParams,
                  error: err,
                }));
              });
          }, inBatchUpdateInterval);
        });
      });
  }, Promise.resolve());
}
