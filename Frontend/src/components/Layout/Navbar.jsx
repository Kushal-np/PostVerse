// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Compass, Bookmark, Bell, User } from "lucide-react";
import useAuthStore from "../stores/AuthStore";

export const  Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { id: "feed", label: "Feed", icon: Home, route: "/feed" },
    { id: "explore", label: "Explore", icon: Compass, route: "/explore" },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark, route: "/bookmarks" },
    { id: "notifications", label: "Notifications", icon: Bell, route: "/notifications" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black border-b border-neutral-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold cursor-pointer">PostVerse</h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm ${
                    isActive ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm rounded-md bg-neutral-800 hover:bg-neutral-700"
              >
                Logout
              </button>
              <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
                <User size={18} />
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-neutral-200"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;