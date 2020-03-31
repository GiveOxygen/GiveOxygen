import AddressOptions from './AddressOptions';

export default {
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
    formObjects: AddressOptions,
  }],
};
