import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../queries/useAuth";
import  useAuthStore  from "../../stores/AuthStore";



export const Signup = () =>{
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const signupMutation = useSignUp();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{

        e.preventDefault();
        try{
            const data = await signupMutation.mutateAsync({username , email , password});
            if(data.success){
                console.log("Registration successfull !");
                navigate("/login")
            }
            else{
                console.log(data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} placeholder="Username" required onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="email" value = {email} placeholder ="Email" required onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" value={password} placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">
                {signupMutation.isLoading? "Signing up..." : "Sign up" }
            </button>
            {signupMutation.isError && (
                <span>
                    {signupMutation.error?.message || "Signup failed"}
                </span>
            )}
        </form>
    )

} 