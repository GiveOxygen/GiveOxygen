import API, { graphqlOperation } from '@aws-amplify/api';
const THRESHOLD = 500;
const __DEV__ = process.env.NODE_ENV === 'development';

export default async (query, params, authMode) => {
  if (__DEV__) {
    global.logger.debug(query);
    global.logger.debug(JSON.stringify(params || {}, null, 2));
  }

  const startedAt = Date.now();
  const options = graphqlOperation(query, params);
  // https://github.com/aws-amplify/amplify-js/blob/master/packages/api/src/types/index.ts#L75
  options.authMode = authMode || 'AMAZON_COGNITO_USER_POOLS';
  console.log(options);
  const res = await API.graphql(options);

  if (__DEV__) {
    global.logger.debug(JSON.stringify(res, null, 2));

    const time = Date.now() - startedAt;
    const name = `${query.split('(')[0].replace(/ +/g, ' ').replace(/\n+/g, '')}`;
    global.logger.info(`API:${name} ${time} ms ${time>THRESHOLD?'***':''}`);
  }


  return res;
};
