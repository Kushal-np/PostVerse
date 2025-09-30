import { useNavigate } from "react-router-dom";
import useAuthStore  from "../../stores/AuthStore.js";
import { useLogin } from "../../queries/useAuth.js";
import { useState } from "react";


export const Login = () =>{
    const [email , setEmail ]  = useState("");
    const [password , setPassword] = useState("");
    const {setAuth} = useAuthStore();
    const loginMutation = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const data = await loginMutation.mutateAsync({email , password});
            console.log(data)
            if(data.success){
                setAuth(data.user , data.token);
                navigate("/");
            }
            else{
                console.log(data.message);
            }
        }
        catch(error){
            console.log(error)
            console.log("Error while fetching through the backend")
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} placeholder="Enter Email" required onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" value={password} placeholder="Enter password" required onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">
                {
                    loginMutation.isLoading ? "Logging in..." : "Login"
                }
            </button>
            {
                loginMutation.isError && (
                    <span>
                        {loginMutation.error?.message || "Login failed"}
                    </span>
                )
            }
        </form>
    )

    
}