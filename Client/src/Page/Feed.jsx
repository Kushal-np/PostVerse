import React from 'react';
import { useFeedPosts } from '../hooks/usePosts';
import useAuthStore from '../stores/authStore';
import PostForm from '../components/PostForm';

function Feed() {
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useFeedPosts();

  console.log('Feed data:', data); // Debug
  console.log('Feed error:', error); // Debug

  const posts = data?.pages?.flatMap((page) => page.posts || []) || [];
  console.log(posts)
  console.log("the above ones are the post")
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Feed</h1>
        {user && ['writer', 'editor', 'admin'].includes(user.role) && (
          <div style={{ width: '300px' }}>
            <PostForm />
          </div>
        )}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {posts.length === 0 && !isLoading && !error && <p>No posts available</p>}
      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.bodyMarkDown}</p>
            <p>By: {post.author?.username || 'Unknown'}</p>
            <p>Status: {post.status}</p>
            <p>Visibility: {post.visibility}</p>
            {post.coverImage && <img src={post.coverImage.url} alt="Cover" style={{ maxWidth: '100%' }} />}
          </div>
        ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Feed;