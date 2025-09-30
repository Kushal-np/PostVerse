import {useMutation , useQuery , userQueryClient} from "@tanstack/react-query"
import { register , signin , signout , getMe , updateTheme } from "../api/authApi.js" 
import useAuthStore from "../stores/authStore"

export const useRegister = () =>{
    useMutation({
        mutationFn:register

    })
};

export const useSignin = () =>{
    const setUser = useAuthStore((state) => set(state.setUser));
    return useMutation({
        mutationFn:signin , 
        onSuccess: (res) => setUser(res.data.user , res.data.teken),
    });
};


export const useSignOut = ()=>{
    const logout = useAuthStore ((state)=>(state.logout));
    return useMutation({
        mutationFn: signout  , 
        onSuccess:logout
    })
}


export const getMe = () => useQuery({
    queryKey:["me"] , 
    queryFn: getMe 
})


export const useUpdateTheme = () =>{
    const queryClient = userQueryClient();
    const updateThemeStore = useAuthStore((state) =>{state.updateTheme});

    return useMutation({
        mutationFn: ({id , theme}) => updateTheme(id , theme) , 
        onSuccess:(res) =>{
            updateThemeStore(res.data.Me.Theme);
            queryClient.invalidateQueries(["me"]);
        }
    })

}