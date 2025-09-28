import Media from "../models/Media.model";
import Post from "../models/post.model";

export const createPost = async (req, res) => {
  try {
    const { title, slug, bodyMarkDown, status, visibility } = req.body;
    let coverImageDoc;
    if (req.file) {
      const streamUpload = (reqFile) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_posts" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(reqFile.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req.file);

      coverImageDoc = await Media.create({
        url:result.secure_url , 
        filename:req.file.originalname , 
        uploadedBy:req.user._id , 
      })
    }


    const publishedAt = status === "published" ? new Date() : null ;

    const newPost = await Post.create({
        title , 
        slug , 
        bodyMarkDown , 
        author:req.user._id , 
        coverImage: coverImageDoc ? coverImageDoc._id : null , 
        status: status || "draft" , 
        visibility : visibility || "public" , 
        publishedAt , 
    });

    res.status(201).json({
        success:true , 
        post:newPost 
    });
  } catch (error) {

    console.log(error) ; 
    res.status(500).json({
        success:false, 
        message:"Server error creating the file "
    })

  }
};



export const getPost = async(req, res)=>{
    try{
        const filter = {visibility:"public"};
        if(req.user){
            filter.$or = [{visibility:"public"} , {author:req.user._id}];
        }
        const posts = await Post.find({visibility:"public"})
        .populate("author" , "username role")
        .populate("coverImage")
        res.status(200).json({
            success:true ,
            posts
    
        })
    }
    catch(error){
        console.log("Get posts error:" ,error)
        res.status(500).json({
            success:false , 
            message:"server error"
        })
    }
}


export const getPostById = async(req , res)=>{
    try{
        const post = await Post.findById(req.params.id)
        .populate("author" , "username role")
        .populate("coverImage");
        
        if(!post){
            return res.status(404).json({
                success:false , 
                message:"Post not found" ,
            })
        }

        if(post.visibility === "private" && (!req.user || req.user._id.toString()!== post.author._id.toString())){
            return res.status(403).json({
                success:false , 
                message:"Access Denied"
            });
        }
        res.status(200).json({
            success:true , 
            post
        })
    }
    catch(error){
        console.log("Get Post Error" , error)
        res.status(500).json({
            success:false , 
            message:"Server error"
        })
    }
}