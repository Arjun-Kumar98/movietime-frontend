import React, { useState } from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import './loginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    setErrors((prev)=>({...prev,email:""}));
  };

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setErrors((prev)=>({...prev,password:""}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validationErrors = {};
  
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }
  
    if (!password) {
      validationErrors.password = "Password is required";
    }
  
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      console.log('Login successful with:', { email, password });
      // Add your login/auth logic here
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
