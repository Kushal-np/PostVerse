import React, { useState } from 'react'
import { useRegister } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const {mutate , isLoading} = useRegister();
  const navigate = useNavigate();

  const handleSubmit=  (e) =>{
    e.preventDefault();
    mutate({username , email , password});
    navigate("/login")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="username"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button type='submit'>
          {
            isLoading ? "Registering" : "Register"
          }
        </button>
      </form>
    </div>
  )
}

export default Register