import { useState } from "react";
import useAuthStore from "../stores/authStore"
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";



const PostForm = ({post}) => {
    const {user}= useAuthStore();
    const [title , setTitle] = useState(post?.title || "") ; 
    const [bodyMarkDown , setBodyMarkDown]= useState(post?.bodyMarkDown || "");
    const [status , setStatus]= useState(post?.status || 'draft');
    const [visibility , setVisibility]=  useState(post?.visibility || 'public');
    const {mutate: createPost , isLoading : isCreating  , error:createError} = useCreatePost();  
    const {mutate: updatePost , isLoading: isUpdating , error:updateError} = useUpdatePost();
    const navigate = useNavigate();


    if(!user || !["writer" , "editor" , "admin"].includes(user.role)){
        return <p>You are not authorized to create post</p>
    }

    const handleSubmit = () =>{
        e.preventDefault();
        try{
            const data = {title , bodyMarkDown , status , status , visibility};
            if(post){
                updatePost(
                    {id:post._id , data},
                    {
                        onSuccess:()=> navigate(`post/${post._id}`),
                        onError:(error) => <div>{error.message}</div>
                    }
                )
            }
            else{
                createPost(data , {
                    onSuccess:() => navigate("/feed"),
                    onError: (error) => <div>{error.message}</div> 
                })
            }
        }
        catch(error){

        }
    }
  return (
    <div>
        <h2>{post? "Edit Post" : "Create Post"}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value) }} placeholder="Enter your title here" />

            <textarea value={bodyMarkDown} onChange={(e) => {setBodyMarkDown(e.target.value)}} placeholder="Enter your post markdown here"></textarea>
            <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
            </select>
            <select value={visibility} onChange={(e)=>{setVisibility(e.target.value)}}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <button type="submit" disabled={isCreating || isUpdating} >
                {
                    (isCreating || isUpdating)? "Saving..." : post ? "Update Post": "Create Post" 
                }
            </button>
        </form>
        {
            (createError || updateError) && (
                <p> {(createError || updateError)}</p>
            )
        }

    </div>
  )
}

export default PostForm