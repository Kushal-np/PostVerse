import {Navigate} from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function ProtectedRoute({children}){
    const user = useAuthStore((state) => state.user) ; 
    if(user){
        children: <Navigate to="/" /> 
    }
    else{
        children:<Navigate to="/login" />
    }
}


export default ProtectedRoute ; 