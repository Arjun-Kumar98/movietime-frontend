import React, { useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState({ email: false, password: false, confirmPassword: false });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password && confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup Data:", { email, password, confirmPassword });
      // Submit logic here
    }
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
