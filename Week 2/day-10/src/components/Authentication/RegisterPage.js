import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Register the user using Firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        console.log('Registered:', user);
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        // Registration failed
        console.error('Error registering:', error);
        // Handle the error appropriately (e.g., display an error message)
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {registrationSuccess ? (
        <div>
          <p>Registration successful! You can now proceed to login.</p>
          <Link to="/login">Go to Login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
