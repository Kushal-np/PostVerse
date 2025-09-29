import create from 'zustand' ; 

export const useAuthStore = create((set,get)=>({
    user:null , 
    token : null , 
    isAuthenticated : false , 


    setAuth: (user , token) =>{
        localStorage.setItem("token" , token );
        localStorage.setItem("user" , JSON.stringify(user));
        set({user , token , isAuthenticated : true});
    },

    logout:()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({user:null , token:null , isAuthenticated:false});
    },

    restore:()=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem("user");
        if(token && user){
            set({token , user:JSON.parse(user) , isAuthenticated:true })
        }
    }
}));