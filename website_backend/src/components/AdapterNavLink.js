import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line
export default React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);
