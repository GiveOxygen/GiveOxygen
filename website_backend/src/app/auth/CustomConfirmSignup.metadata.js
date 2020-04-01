export default (t) => {
  return {
    fields: [{
      key: 'code',
      type: 'String',
      label: t('auth.code'),
      isRequired: true,
    }],
  };
};
