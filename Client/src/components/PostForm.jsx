import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';
import { useCreatePost, useUpdatePost } from '../hooks/usePosts';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState(post?.title || '');
  const [bodyMarkDown, setBodyMarkDown] = useState(post?.bodyMarkDown || '');
  const [status, setStatus] = useState(post?.status || 'draft');
  const [visibility, setVisibility] = useState(post?.visibility || 'public');
  const [coverImage, setCoverImage] = useState(null);
  const { mutate: createPost, isLoading: isCreating, error: createError } = useCreatePost();
  const { mutate: updatePost, isLoading: isUpdating, error: updateError } = useUpdatePost();
  const navigate = useNavigate();

  console.log('PostForm user:', { user }); // Debug

  if (!user || !['writer', 'editor', 'admin'].includes(user?.role)) {
    return <p style={{ textAlign: 'center', color: 'red' }}>You are not authorized to create posts</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const data = { title, slug, bodyMarkDown, status, visibility };
    if (coverImage && coverImage instanceof File) {
      data.coverImage = coverImage;
    }
    console.log('PostForm submit data:', data); // Debug
    try {
      if (post) {
        updatePost(
          { id: post._id || post.id, data },
          {
            onSuccess: () => navigate(`/post/${post._id || post.id}`),
            onError: (error) => {
              console.error('UpdatePost onError:', error); // Debug
              alert(error.message || 'Failed to update post');
            },
          }
        );
      } else {
        createPost(data, {
          onSuccess: () => navigate('/feed'),
          onError: (error) => {
            console.error('CreatePost onError:', error); // Debug
            alert(error.message || 'Failed to create post');
          },
        });
      }
    } catch (error) {
      console.error('Submit error:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto' }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here"
          style={{ margin: '10px 0', padding: '5px' }}
        />
        <textarea
          value={bodyMarkDown}
          onChange={(e) => setBodyMarkDown(e.target.value)}
          placeholder="Enter your post markdown here"
          style={{ margin: '10px 0', padding: '5px', minHeight: '100px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ margin: '10px 0', padding: '5px' }}
        >
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          style={{ margin: '10px 0', padding: '5px' }}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          style={{ margin: '10px 0', padding: '5px' }}
        />
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}
        >
          {(isCreating || isUpdating) ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </form>
      {(createError || updateError) && (
        <p style={{ color: 'red' }}>{(createError?.message || updateError?.message) || 'An error occurred'}</p>
      )}
    </div>
  );
}

export default PostForm;