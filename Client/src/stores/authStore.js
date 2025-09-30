import {create} from "zustand";


const useAuthStore = create((set)=>({
    user:null ,
    token: null , 
    setUser : (user,token) => set({user , token}),
    logout: () =>set({user : null , token:null}) , 
    updateTheme: (theme) => set((state)=> ({
        user: state.user ? {...state.user , theme} : null , 
    }))
}))


export default useAuthStore ; 