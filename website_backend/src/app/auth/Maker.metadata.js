import AddressOptions from './AddressOptions';

export default (t) => {
  return {
    fields: [{
      key: 'jobTitle',
      type: 'String',
      label: 'Job Title',
      isRequired: true,
    }, {
      key: 'address',
      type: 'Object',
      label: 'Address',
      formType: 'Object',
      formObjects: AddressOptions(t),
    }],
  };
};
