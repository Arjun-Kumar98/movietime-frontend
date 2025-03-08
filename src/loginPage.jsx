import React from "react";
import './components/inputBox';
import { InputField } from "./components/inputBox";

function LoginPage(){
   const[email,setEmail] = useState("");
   const[password,setPassword]=useState("");
   const[isTyping,setIsTyping]=useState(false);
   const[error,setError] = useState({email:"",password:""});

   const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    setIsTyping(true);
    setError({...error,email:e.target.value?"":"Email is required"});
   };

   const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setIsTyping(true);
    setError({...error,password:e.target.value?"":"Password is required"});

   };

   return(
    <div>
     <h2>Login</h2>
     <InputField
     label="Email"
     type="text"
     placeholder="Email Id"
     value={email}
     onChange={handleEmailChange}
     isTyping={isTyping}
     error={error.email}
     />
     <InputField
     label="Password"
     type="password"
     placeholder="Password"
     value={password}
     onChange={handlePasswordChange}
     isTyping={isTyping}
     error={error.password}
     />
     <button>Login</button>
      </div>
   );
}
   
   
   
   

