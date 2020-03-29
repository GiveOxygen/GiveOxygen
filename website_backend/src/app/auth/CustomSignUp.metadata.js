export default {
  fields: [{
    key: 'email',
    type: 'Email',
    label: 'Email',
    isRequired: true,
  }, {
    key: 'password',
    type: 'Password',
    label: 'Password',
    isRequired: true,
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
    formType: 'phone',
    label: 'Phone Number',
    isRequired: true,
  }, {
    key: 'role',
    type: 'String',
    label: 'I am a... ',
    isRequired: true,
    formType: 'Radio',
    formOptions: [
      { label: 'Hospital Admin', value: 'hospitalAdmin' },
      { label: 'Maker', value: 'maker' },
      // { label: 'Supplier', value: 'supplier' },
    ],
  }],
};
