export default (t) => {
  return {
    fields: [{
      key: 'email',
      type: 'Email',
      label: t('profile.email'),
      isRequired: true,
    }, {
      key: 'password',
      type: 'Password',
      label: t('profile.password'),
      isRequired: true,
    }],
  };
};
