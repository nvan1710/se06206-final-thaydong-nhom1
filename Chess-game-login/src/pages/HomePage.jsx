import React from 'react';
import SignInForm from '../components/SignInForm'; // Import SignInForm component

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome to Chess Game!
          Please Sign In to Play
        </h2>
        <SignInForm /> {/* Add SignInForm here */}
      </div>
    </div>
  );
};

export default HomePage;

