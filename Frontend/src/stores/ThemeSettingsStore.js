const useSettingsStore =  create((set , get)=>({
    theme:"light" , 
    setTheme: (theme) =>{
        localStorage.setItem("theme" , theme);
        set({theme})
    },
    restoreThemeFromLocal : ()=>{
        const t = localStorage.getItem("theme") ;
        if(t){
            set({theme:t});
        }
    },


    updateTheme: (theme) =>{
        const user = get().user ; 
        if(user){
            const updatedUser = {...user , theme};
            localStorage.setItem("user" , JSON.stringify(updatedUser));
            set({user:updatedUser});
        }
    
    }
}));


export default useSettingsStore ;