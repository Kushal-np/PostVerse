import { useNavigate } from "react-router-dom";
import { useSignOut } from "../../queries/useAuth";
import  useAuthStore from "../../stores/AuthStore";


export const LogoutButton = () =>{
    const signOutMutation = useSignOut();
    const {logout} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async() =>{
        try{
            await signOutMutation.mutateAsync();
            logout();
            navigate("/login");
        }
        catch(error){
            console.log("Signout failed" , error.message)
            console.log("Debugged")
        }
    }


    return(
            <div onClick={handleLogout}>
                Logout
            </div>
    )

}