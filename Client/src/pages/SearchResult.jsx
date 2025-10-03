import React from "react";
import { useSearchParams } from "react-router-dom";
import { useUnifiedSearch } from "../hooks/useSearch";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, isLoading, isError, error } = useUnifiedSearch(q);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{q}"</h1>
      <div className="space-y-4">
        {data?.posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="space-y-2">
          {data?.users?.map((user) => (
            <div key={user._id} className="p-2 border rounded">
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
