export const updateProfileImage = async(req , res)=>{
    try{
        const userId = req.user._id ; 
        const {type} = req.body; 
        const imageUrl= req.file?.path;
        
        if(!imageUrl){
            return res.status(400).json({
                success:false , 
                message:"No image uploads"
            })
        }

        const updateField = type = "cover" ? {coverPicture : imageUrl} : {profilePicture:imageUrl}
        const updatedUser = await User.findByIdAndUpdate(
            userId , 
            {$set : updateField},
            {new:true}
        ).select("username email profilePicture coverPicture");

        res.status(200).json({
            success:true , 
            message: `${type} picture updated` , 
            user:updatedUser , 
        });
    }
    catch(error){
        console.log("Updated the profile picture" , error.message);
        res.status(500).json({
            success:false , 
            message:"Internal Server Error"
        })
    }
}