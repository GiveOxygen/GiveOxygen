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
    }, {
      key: 'firstName',
      type: 'String',
      label: t('profile.firstName'),
      isRequired: true,
    }, {
      key: 'lastName',
      type: 'String',
      label: t('profile.lastName'),
      isRequired: true,
    }, {
      key: 'phoneNumber',
      type: 'string',
      // formType: 'phone',
      label: t('auth.phoneNumberWithCountryCode'),
      isRequired: true,
    }, {
      key: 'role',
      type: 'String',
      label: t('auth.iAmRole'),
      isRequired: true,
      formType: 'Radio',
      formOptions: [
        { label: t('hospital.admin'), value: 'hospitalAdmin' },
        { label: t('maker'), value: 'maker' },
        // { label: 'Supplier', value: 'supplier' },
      ],
    }],
  };
};
