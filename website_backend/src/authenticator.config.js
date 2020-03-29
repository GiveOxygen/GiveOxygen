import React from 'react';
import {
  ConfirmSignIn,
  RequireNewPassword,
  // SignIn,
  // SignUp,
  // ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  // TOTPSetup,
  Loading,
} from 'aws-amplify-react';
import amplifyTheme from './constants/amplify.theme';
import CustomSignIn from './app/auth/CustomSignIn';
import CustomSignUp from './app/auth/CustomSignup';
import CustomConfirmSignUp from './app/auth/CustomConfirmSignup';

export default {
  includeGreetings: true,
  theme: amplifyTheme,
  authenticatorComponents: [
    /* eslint-disable */
    // <SignIn />,
    <CustomSignIn override={'SignIn'}/>,
    // <SignUp signUpConfig={signUpConfig}/>,
    <CustomSignUp override={'SignUp'}/>,
    // <ConfirmSignUp />,
    <CustomConfirmSignUp override={'ConfirmSignUp'}/>,
    <ConfirmSignIn />,
    <RequireNewPassword />,
    <VerifyContact/>,
    <ForgotPassword />,
    // <TOTPSetup />,
    <Loading />,
    /* eslint-enable */
  ],
};
