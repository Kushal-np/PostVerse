import create from "zustand";

export const useAuthStore = create((set)=>({
    user:{
        _id : 'testUser',
        username:"ramBahadur" , 
        role:'admin'
    },
    setUser:(user)=>set({user}),
}));