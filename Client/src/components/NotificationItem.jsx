import React from "react";
import { useMarkAsRead } from "../hooks/useNotifications";

const NotificationItem = ({ notification }) => {
  const { mutate: markAsRead } = useMarkAsRead();

  return (
    <div
      className={`p-4 border-b border-gray-200 ${!notification.isRead ? "bg-blue-50" : ""}`}
      onClick={() => useMarkAsRead(notification._id)}
    >
      <p className="text-sm text-gray-700">
        {notification.type === "like" && (
          <span>{notification.sender?.username} liked your post</span>
        )}
        {notification.type === "comment" && (
          <span>{notification.sender?.username} commented on your post</span>
        )}
        {notification.type === "follow" && (
          <span>{notification.sender?.username} started following you</span>
        )}
      </p>
    </div>
  );
};

export default NotificationItem;
