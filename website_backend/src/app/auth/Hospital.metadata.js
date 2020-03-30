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
    formType: 'phone',
    label: 'Hospital Phone Number',
    isRequired: true,
  }, {
    key: 'hospitalAddress',
    type: 'Object',
    label: 'Address',
    formType: 'Object',
    formObjects: [{
      key: 'street',
      type: 'String',
      label: 'Street',
      isRequired: true,
    }, {
      key: 'street2',
      type: 'String',
      label: 'Street 2',
      isRequired: false,
    }, {
      key: 'city',
      type: 'String',
      label: 'City',
      isRequired: true,
    }, {
      key: 'state',
      type: 'String',
      label: 'State',
      isRequired: true,
    }, {
      key: 'zipCode',
      type: 'String',
      label: 'Zip Code',
      isRequired: true,
    }],
  }],
};
