export const createCategory = async(req , res)=>{
    try{
        const {name , description} = req.body ; 
        const category = await Category.create({name , slug , description});
        res.status(201).json({
            success:true , 
            category
        });
    }
    catch(error){
        res.status(500).json({
            success:false , 
            message:"Error creating categories"
        })
    }
}



export const getCategories = async(req , res)=>{
    const categories = await Category.find();
    res.status(200).json({
        success:true , 
        categories
    })
}


export const deleteCategory = async(req , res)=>{
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true , 
        message:"Category deleted"
    })
}