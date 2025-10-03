import React, { useState } from "react";
import { useGetMe } from "../hooks/useAuth";
import { useUpdateProfileImage } from "../hooks/useProfile";
import { useGetAllBookmarks } from "../hooks/useBookmark";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { FiCamera, FiBookmark, FiUser, FiMail, FiTag } from "react-icons/fi";

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: userData, isLoading, isError, error } = useGetMe();
  const { data: bookmarks } = useGetAllBookmarks();
  const { mutate: updateProfileImage, isLoading: isUpdatingImage } = useUpdateProfileImage();
  const [image, setImage] = useState(null);
  const [type, setType] = useState("profile");

  // Safely access user data
  const user = userData?.user || userData;

  const handleImageUpdate = (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', type);

    updateProfileImage(formData, {
      onSuccess: (data) => {
        queryClient.setQueryData(['me'], (oldData) => {
          if (!oldData) return oldData;
          const updatedUser = {
            ...oldData.user,
            ...(type === 'profile' ? { profilePicture: data.user.profilePicture } : { coverPicture: data.user.coverPicture })
          };
          return {
            ...oldData,
            user: updatedUser
          };
        });
        alert("Image updated successfully");
      },
      onError: (error) => {
        console.error("Update error:", error);
        alert(error.message || "Failed to update image");
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Photo Section */}
        <div className="relative h-64">
          {user?.coverPicture ? (
            <img
              src={user.coverPicture}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-gray-500 flex items-center">
                <FiCamera className="mr-2" />
                <span>No cover photo</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <img
                src={user?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md">
                <FiCamera className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4 ml-36">
            <h1 className="text-3xl font-bold text-gray-800">{user?.username || "User"}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <FiMail className="mr-2" />
              <span>{user?.email || "No email"}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-500">
              <FiTag className="mr-2" />
              <span>{user?.role || "Unknown"}</span>
            </div>
          </div>

          {/* Image Update Form */}
          <form onSubmit={handleImageUpdate} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="profile">Profile Picture</option>
                <option value="cover">Cover Photo</option>
              </select>
              <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-r-lg cursor-pointer hover:bg-gray-200 transition-colors">
                Choose File
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isUpdatingImage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              {isUpdatingImage ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : "Update Image"}
            </button>
          </form>
        </div>
      </div>

      {/* Bookmarks Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FiBookmark className="text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Bookmarks</h2>
        </div>

        {bookmarks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <div key={bookmark._id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-1">{bookmark.post?.title || "Untitled"}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {bookmark.post?.bodyMarkDown?.substring(0, 100) || "No description"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FiBookmark className="mx-auto text-3xl mb-2 text-gray-300" />
            <p>No bookmarks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
