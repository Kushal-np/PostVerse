import {Navigate} from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function ProtectedRoute({children}){
    const user = useAuthStore((state) => state.user) ; 
    return user? children: <Navigate to="/login" />
}


export default ProtectedRoute ; 