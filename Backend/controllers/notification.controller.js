import Notification from "../models/notification.model.js";



export const getNotifications = async(req , res)=>{
    try{
        const notifications = await Notification.find({reciepient:req.user._id})
        .populate("sender" , "username")
        .populate("post","title")
        .populate("comment" , "body")
        .sort({createdAt:-1});

        res.status(200).json({
            success:true , 
            notifications
        })
    }
    catch(error){
        console.log("Get notification error" , error);
        res.status(500).json({
            success:false , 
            message:"Server error"
        })
    }
}



export const markAsRead = async(req , res) =>{
    try{
        const notification = await Notification.findById(req.params.id);
        if(!notification){
            return res.status(404).json({
                success:false , 
                message:"Notification not found"
            })
        }
        if(notification.recipient.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false , 
                message:"Not authorized"
            })
        }

        notification.isRead = true ;
        await notification.save();

        res.status(200).json({
            success:true , 
            notification
        })
    }
    catch(error){
        console.log("Mark as Read Error" , error);
        res.status(500).json({
            success:false , 
            message:"Server error"
        })
    }
}