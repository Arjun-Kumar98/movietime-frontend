import React, { useState } from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
      

        if (response.ok) {
          alert('Login successful!');
          console.log('Token:', result.token);
          // Optional: store token
           localStorage.setItem('token', result.token);
           localStorage.setItem('userId',result.userData);
           navigate('/movieList');
        } else {
          alert(result.error || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Something went wrong during login.',error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Sign In</h1>

      <form className="signin-form" onSubmit={handleSubmit}>
        
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          isTyping={!!email}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          isTyping={!!password}
        />

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <Button type="submit" label="Login" variant="primary" />
      </form>
    </div>
  );
}

export default LoginPage;
