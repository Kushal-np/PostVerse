import {useMutation , useQuery , useQueryClient} from "@tanstack/react-query"
import { register , signin , signout , getMe , updateTheme } from "../api/authApi.js" 
import useAuthStore from "../stores/authStore"

export const useRegister = () =>{
    return useMutation({
        mutationFn:register

    })
};
console.log(useAuthStore.getState())
export const useSignin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: signin,
    onSuccess: (res) => {
      console.log('Signin response:', res.data); // Debug
      setUser(res.data.user, res.data.token);
      console.log('useAuthStore after setUser:', useAuthStore.getState()); // Debug
    },
    onError: (error) => ({ message: error.response?.data?.message || 'Login failed' }),
  });
};


export const useSignOut = ()=>{
    const logout = useAuthStore ((state)=>(state.logout));
    return useMutation({
        mutationFn: signout  , 
        onSuccess:logout
    })
}


export const useGetMe = () => useQuery({
    queryKey:["me"] , 
    queryFn: getMe 
})


export const useUpdateTheme = () =>{
    const queryClient = useQueryClient();
    const updateThemeStore = useAuthStore((state) =>{state.updateTheme});

    return useMutation({
        mutationFn: ({id , theme}) => updateTheme(id , theme) , 
        onSuccess:(res) =>{
            updateThemeStore(res.data.Me.Theme);
            queryClient.invalidateQueries(["me"]);
        }
    })

}