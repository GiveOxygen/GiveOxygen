import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Paper } from '@material-ui/core';
import DetailForm from 'react-material-final-form';
import { useTranslation } from 'react-i18next';

import MakerMetadata from './Maker.metadata';
import HospitalAdminMetadata from './HospitalAdmin.metadata';

import request from '../../utils/request';
import { getHospitalAdmin, getMaker } from '../../graphql/queries';
import { updateMaker, updateHospitalAdmin } from '../../graphql/mutations';

export default () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState('hospitalAdmin');
  const [user, setUser] = useState({});

  const update = async (data) => {
    setIsSubmitting(true);

    // graphql adaption
    delete data.createdAt;
    delete data.updatedAt;
    if (role === 'hospitalAdmin') {
      delete data.hospital;
      await request(updateHospitalAdmin, {
        input: data,
      });
    } else {
      // TODO: Update coordinates at backend
      if (data.address && !data.address.street2) {
        delete data.address.street2;
      }
      await request(updateMaker, {
        input: data,
      });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    (async () => {
      const res = await Auth.currentAuthenticatedUser();
      const {
        'custom:role': userRole,
        email,
      } = res.attributes;
      setRole(userRole);

      if (userRole === 'hospitalAdmin') {
        const { data: { getHospitalAdmin: result } } = await request(getHospitalAdmin, { email });
        global.logger.debug(result);
        result && setUser(result);
      } else
      if (userRole === 'maker') {
        const { data: { getMaker: result } } = await request(getMaker, { email });
        global.logger.debug(result);
        result && setUser(result);
      }
    })();
  }, []);

  return (
    <Paper style={{ padding: 16 }}>
      <DetailForm
        // title={'Sign Up'}
        metadata={ role ==='hospitalAdmin'? HospitalAdminMetadata(t): MakerMetadata(t)}
        data={user}
        isLoading={isSubmitting}
        onSubmit={update}
        submitButtonText={t('action.update')}
        submitButtonProps={{
          variant: 'contained',
          color: 'primary',
          type: 'submit',
          fullWidth: true,
        }}
      />
    </Paper>
  );
};
