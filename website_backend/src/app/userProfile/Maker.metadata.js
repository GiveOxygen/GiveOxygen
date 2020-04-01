import AddressOptions from '../auth/AddressOptions';

export default (t) => {
  return {
    fields: [{
      key: 'id',
      type: 'String',
      label: 'ID',
      isRequired: true,
      isDisabled: true,
      isHidden: true,
    }, {
      key: 'email',
      type: 'Email',
      label: t('profile.email'),
      isRequired: true,
      isDisabled: true,
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
      label: t('profile.phoneNumber'),
      isRequired: true,
    }, {
      key: 'jobTitle',
      type: 'String',
      label: t('profile.jobTitle'),
      isRequired: true,
    }, {
      key: 'address',
      type: 'Object',
      label: t('profile.address'),
      formType: 'Object',
      formObjects: AddressOptions(t),
    }],
  };
};
