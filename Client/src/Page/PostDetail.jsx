import React from 'react'
import { useParams } from 'react-router-dom'
import { usePostById } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const PostDetail = () => {
  const {id} = useParams();
  const {user} = useAuthStore();
  const {data : post , isLoading , error} = usePostById(id);

  if(isLoading){
    return (
      <div>
        Loading Post...
      </div>
    )
  }
  if(error){
    return(
      <div className='text-red-500 text-4xl'>
        {error.message}
      </div>
    )
  }

  return (
    <div>
      <PostCard post={post} />
      {user && ['writer','editor','admin'].includes(user.role) && post.author._id === user.id && (
        <PostForm post={post} />
      ) }
    </div>
  )
}

export default PostDetail;