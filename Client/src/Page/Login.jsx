import React from 'react'
import { useSignin } from '../hooks/useAuth'
import { useState } from 'react'
import {useNavigate }from "react-router-dom"
const Login = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {mutate , isLoading} = useSignin();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        mutate({email, password})
        navigate("/")
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type='submit'>

                {isLoading ? "Signing in" : "Sign in"}

            </button>
        </form>
    </div>
  )
}

export default Login