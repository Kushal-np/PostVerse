import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../stores/authStore";
import { useGetMe } from "../hooks/useAuth";
import { useGetFollowers, useUnfollowUser } from "../hooks/useFollows";
import { useGetAllBookmarks } from "../hooks/useBookmark";
import { useUpdateProfileImage } from "../hooks/useProfile";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isLoadingUser, error: userError, refetch: refetchMe } = useGetMe();
  const { data: followers, isLoading: isLoadingFollowers, error: followersError, refetch: refetchFollowers } = useGetFollowers(user?.id);
  const { data: bookmarks, isLoading: isLoadingBookmarks, error: bookmarksError } = useGetAllBookmarks();
  const { mutate: updateProfileImage, isLoading: isUpdatingImage, error: imageError } = useUpdateProfileImage();

  const [image, setImage] = useState(null);
  const [type, setType] = useState("profile");

  // Force refetch on mount to ensure data loads
  useEffect(() => {
    if (user?.id) {
      refetchFollowers();
    }
  }, [user?.id, refetchFollowers]);

  // Enhanced debug logging
  console.log('Profile - User:', user);
  console.log('Profile - UserData:', userData?.Me, 'Error:', userError);
  console.log('Profile - Followers:', followers, 'Error:', followersError);
  console.log('Profile - Bookmarks:', bookmarks, 'Error:', bookmarksError);

  const handleImageUpdate = (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    updateProfileImage(
      { type, image },
      {
        onSuccess: () => {
          refetchMe();
        },
      }
    );
  };

  if (!user) return <p className="text-red-400 text-center mt-10">Please log in to view your profile</p>;
  if (isLoadingUser || isLoadingFollowers || isLoadingBookmarks)
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;

  if (userError || followersError || bookmarksError || imageError) {
    return (
      <div className="text-center text-red-400 mt-10">
        {userError?.message ||
          followersError?.message ||
          bookmarksError?.message ||
          imageError?.message ||
          "Unknown error"}
      </div>
    );
  }

  const me = userData?.Me;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-10">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden">
        {/* Cover */}
        <div className="relative">
          {me?.coverPicture ? (
            <img
              src={me.coverPicture}
              alt="Cover"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
              No cover image
            </div>
          )}
          {/* Profile Pic */}
          <div className="absolute -bottom-16 left-8">
            <img
              src={me?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-900 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 px-8 pb-8 text-white">
          <h1 className="text-3xl font-bold">{me?.username || "Unknown User"}</h1>
          <p className="text-gray-300">{me?.email}</p>
          <p className="mt-2 text-sm text-gray-400">
            Role: <span className="text-blue-400">{me?.role}</span>
          </p>

          {/* Upload Form */}
          <form
            onSubmit={handleImageUpdate}
            className="mt-6 flex items-center gap-4 flex-wrap"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2 bg-gray-700 text-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="profile">Profile</option>
              <option value="cover">Cover</option>
            </select>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg"
            />
            <button
              type="submit"
              disabled={isUpdatingImage}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:bg-gray-600"
            >
              {isUpdatingImage ? "Updating..." : "Update Image"}
            </button>
          </form>
        </div>
      </div>

      {/* Followers */}


      {/* Bookmarks */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Bookmarks</h2>
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
          {bookmarks?.length ? (
            <ul className="space-y-2">
              {bookmarks.map((b) => (
                <li
                  key={b._id}
                  className="bg-gray-700/50 px-4 py-2 rounded-lg text-gray-200"
                >
                  {b.post?.title || "Untitled"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No bookmarks yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;