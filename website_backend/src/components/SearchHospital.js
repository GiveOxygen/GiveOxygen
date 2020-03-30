import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import request from '../utils/request';

const filter = createFilterOptions();

const SearchHospital = ({ onUpdate, addNewIfNotExist=true }) => {
  const [value, setValue] = React.useState(null);
  const [hospitals, setHospitals] = useState([]);

  const getHospitals = async () => {
    const { data: { listHospitals: { items: result } } } = await request( /* GraphQL */ `
    query ListHospitals(
      $filter: ModelHospitalFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          description
          email
          phoneNumber
          address {
            street
            street2
            city
            state
            zipCode
          }
          coordinates {
            latitude
            longitude
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `, null, 'API_KEY');
    console.log(result);
    setHospitals(result);
  };

  useEffect(() => {
    (async () => {
      await getHospitals();
    })();
  }, []);

  const renderInput = (params) => <TextField {...params} label="Hospital Name" variant="outlined" />;

  return (
    <Autocomplete
      id="search-hospital-box"
      options={hospitals}
      renderOption={(option) => option.name}
      style={{ width: 300 }}
      renderInput={renderInput}
      value={value}
      onChange={(event, newValue) => {
        if (addNewIfNotExist && newValue && newValue.inputValue) {
          const data = {
            name: newValue.inputValue,
          };
          setValue(data);
          onUpdate && onUpdate(data);
          return;
        }

        setValue(newValue);
        onUpdate && onUpdate(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (addNewIfNotExist && params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      freeSolo
    />
  );
};

SearchHospital.propTypes = {
  onUpdate: PropTypes.func,
  addNewIfNotExist: PropTypes.bool,
};

export default SearchHospital;
