import React from "react";
import { useFeedPosts } from "../hooks/usePosts";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useFeedPosts();

  return (
    <div>
      <h1>Feed</h1>
      {user && ["writer", "editor", "admin"].includes(user.role) && (
        <PostForm />
      )}
      {isLoading ? (
        <div>Loading Feed ...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <button onClick={()=>{fetchNextPage()}} disabled = {isLoading} >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
