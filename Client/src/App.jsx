import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import PostDetail from "./pages/PostDetail";
import PostForm from "./components/PostForm";
import Notifications from "./pages/Notifications";
import SearchResults from "./pages/SearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute allowedRoles={["writer", "editor", "admin"]}>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["writer", "editor", "admin"]}>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
