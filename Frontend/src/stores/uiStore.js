import {create} from "zustand" ; 

export const useUIStore = create((set)=>({
    //feed
    scrollY : 0 , 
    setScrollY : (y)=> set({scrollY:y}),

    //postmodel 
    selectedPostId : null , 
    openPostModal : (id) => set({ selectedPostId : id }),
    closePostModal : ()=>set({selectedPostId:null}),

    //search State
    searchQuery : '' , 
    setSearchQuery : (q)=>set({searchQuery : q}) , 

    //Notification modal toggle 

    isNotificationOpen :false , 
    toggleNotifications : ()=> set((state)=>({isNotificationOpen : !state.isNotificationOpen}))
}));