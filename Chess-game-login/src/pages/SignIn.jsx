// SignIn.jsx

import React from 'react';
import SignInForm from '../components/SignInForm';  // Import SignInForm component

const SignInPage = () => {  // Rename the function to SignInPage or any other name
  return (
    <div>
      <SignInForm />  {/* Use the SignInForm component inside this page */}
    </div>
  );
};

export default SignInPage;  // Export SignInPage component
