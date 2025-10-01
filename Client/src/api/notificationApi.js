export const getNotifications  = async() =>{
    const res = await api.get(`/api/Notifications`);
    return res.data.notificaions ; 
}

export const markAsRead = async(id) =>{
    const res = await api.patch(`/api/Notifications/${id}/read`);
    return res.data.notification ; 
}

