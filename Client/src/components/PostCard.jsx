import React from 'react'
import useAuthStore from '../stores/authStore';
import { useDeletePost } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {

  const {user} = useAuthStore();
  const {mutate , isLoading} = useDeletePost();

  const handleDelete = () =>{
    if(window.confirm("Are you sure you want to delete this post")){
      mutate(post._id) , {
        onSuccess:() => alert("Post deleted"),
        onError:(error) => alert(error.message) , 
      }
    }
  }
  return (
    <div>
      <h3>
        <Link to={`/post/${post._id}`} >{post.title}</Link>
      </h3>
      <p>{post.bodyMarkDown.subString(0,100)}...</p>
      <p>By: {post.author.username}</p>
      <p>Status:{post.status}</p>
      <p>Visibility:{post.visibility}</p>
      <p>Likes: {post.reactions?.like || 0}</p>
      {
        user && ['writer','editor','admin'].includes(user.role) && post.author.id=== user.id && (
          <div>
            <Link to={`/post/${post._id}/edit`} >Edit</Link>
            <button onClick={handleDelete}>
              {isLoading ? 'Deleting' : "Delete"}
            </button>
          </div>
        )
      }
    </div>
  )
}

export default PostCard;