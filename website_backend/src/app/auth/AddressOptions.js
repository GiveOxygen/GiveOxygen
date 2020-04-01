import { getCodeList } from 'country-list';
const countryCodes = getCodeList();

export default (t) => {
  return [{
    key: 'street',
    type: 'String',
    label: t('profile.address.street'),
    isRequired: true,
  }, {
    key: 'street2',
    type: 'String',
    label: t('profile.address.street2'),
    isRequired: false,
  }, {
    key: 'city',
    type: 'String',
    label: t('profile.address.city'),
    isRequired: true,
  }, {
    key: 'state',
    type: 'String',
    label: t('profile.address.state'),
    isRequired: true,
  }, {
    key: 'zipCode',
    type: 'String',
    label: t('profile.address.zipCode'),
    isRequired: true,
  }, {
    key: 'country',
    type: 'String',
    label: t('profile.address.country'),
    formType: 'select',
    formOptions: Object.keys(countryCodes).map((key) => {
      return {
        label: countryCodes[key],
        value: key.toUpperCase(),
      };
    }),
  }];
};
