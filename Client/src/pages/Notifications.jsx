import React from "react";
import NotificationItem from "../components/NotificationItem";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useGetNotifications } from "../hooks/useNotifications";

const Notifications = () => {
  const { data: notifications, isLoading, isError, error } = useGetNotifications();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-2">
        {notifications?.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
