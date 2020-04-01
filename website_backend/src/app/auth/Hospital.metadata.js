import AddressOptions from './AddressOptions';

export default (t) => {
  return {
    fields: [{
      key: 'jobTitle',
      type: 'String',
      label: t('profile.jobTitle'),
      isRequired: true,
    }, {
      key: 'hospitalName',
      type: 'String',
      label: t('hospital.name'),
      isRequired: true,
    }, {
      key: 'hospitalEmail',
      type: 'Email',
      label: t('hospital.email'),
      isRequired: true,
    }, {
      key: 'hospitalPhoneNumber',
      type: 'String',
      // formType: 'phone',
      label: t('hospital.phoneNumber'),
      isRequired: true,
    }, {
      key: 'hospitalAddress',
      type: 'Object',
      label: t('hospital.address'),
      formType: 'Object',
      formObjects: AddressOptions(t),
    }],
  };
};
