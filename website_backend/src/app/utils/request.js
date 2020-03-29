import API, { graphqlOperation } from '@aws-amplify/api';
const THRESHOLD = 500;
const __DEV__ = process.env.NODE_ENV === 'development';

export default async (query, params) => {
  if (__DEV__) {
    global.logger.debug(query);
    global.logger.debug(JSON.stringify(params || {}, null, 2));
  }

  const startedAt = Date.now();
  const res = await API.graphql(graphqlOperation(query, params));

  if (__DEV__) {
    global.logger.debug(JSON.stringify(res, null, 2));

    const time = Date.now() - startedAt;
    const name = `${query.split('(')[0].replace(/ +/g, ' ').replace(/\n+/g, '')}`;
    global.logger.info(`API:${name} ${time} ms ${time>THRESHOLD?'***':''}`);
  }


  return res;
};
