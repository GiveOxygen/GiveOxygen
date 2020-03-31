import { getCodeList } from 'country-list';
const countryCodes = getCodeList();

export default [{
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
  label: 'State/Province',
  isRequired: true,
}, {
  key: 'zipCode',
  type: 'String',
  label: 'Zip Code',
  isRequired: true,
}, {
  key: 'country',
  type: 'String',
  label: 'Country',
  formType: 'select',
  formOptions: Object.keys(countryCodes).map((key) => {
    return {
      label: countryCodes[key],
      value: key.toUpperCase(),
    };
  }),
}];
