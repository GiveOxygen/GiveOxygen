import AddressOptions from './AddressOptions';

export default {
  fields: [{
    key: 'jobTitle',
    type: 'String',
    label: 'Job Title',
    isRequired: true,
  }, {
    key: 'hospitalName',
    type: 'String',
    label: 'Hospital Name',
    isRequired: true,
  }, {
    key: 'hospitalEmail',
    type: 'Email',
    label: 'Hospital Email',
    isRequired: true,
  }, {
    key: 'hospitalPhoneNumber',
    type: 'String',
    // formType: 'phone',
    label: 'Hospital Phone Number (country code)',
    isRequired: true,
  }, {
    key: 'hospitalAddress',
    type: 'Object',
    label: 'Address',
    formType: 'Object',
    formObjects: AddressOptions,
  }],
};
