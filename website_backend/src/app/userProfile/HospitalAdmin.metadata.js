import AddressOptions from '../auth/AddressOptions';

export default {
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
    label: 'Email',
    isRequired: true,
    isDisabled: true,
  }, {
    key: 'firstName',
    type: 'String',
    label: 'First Name',
    isRequired: true,
  }, {
    key: 'lastName',
    type: 'String',
    label: 'Last Name',
    isRequired: true,
  }, {
    key: 'phoneNumber',
    type: 'string',
    // formType: 'phone',
    label: 'Phone Number (country code)',
    isRequired: true,
  }, {
    key: 'jobTitle',
    type: 'String',
    label: 'Job Title',
    isRequired: true,
  }],
};
