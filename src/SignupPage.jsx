import React, { useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
 // const [isTyping, setIsTyping] = useState({ email: false, password: false, confirmPassword: false });
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    if (!confirmPassword) validationErrors.confirmPassword = "Confirm your password";
    else if (password && confirmPassword !== password) validationErrors.confirmPassword = "Passwords do not match";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      try{
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,{
        method:"POST",
        headers:{"Content-Type":"application/json" },
        body:JSON.stringify({email,password}),
        });
      const result = await response.json();
      if(response.status===201){
        alert("Signup successful!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate('/addMovie')
      }else{
        alert(`Signup failed:`);
      }
    }catch(err){
      alert("Signup failed");
    }
      
  };
};

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
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

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword}
          isTyping={!!confirmPassword}
        />

        <Button label="Sign Up" type="submit" variant="primary" />
      </form>
    </div>
  );
  }
export default SignupPage;
