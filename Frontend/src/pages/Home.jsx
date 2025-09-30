import { Home, Compass, Bookmark, Bell, User } from "lucide-react";
import useAuthStore from "../stores/AuthStore"; // ✅ use Zustand store
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostVerseHome() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("feed");
  const navigate = useNavigate();

  const navItems = [
    { id: "feed", label: "Feed", icon: Home, route: "/" },
    { id: "explore", label: "Explore", icon: Compass, route: "/explore" },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark, route: "/bookmarks" },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      route: "/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-black border-b border-neutral-800 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">PostVerse</h1>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 text-sm ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <item.icon size={20} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm rounded-md bg-neutral-800 hover:bg-neutral-700"
                >
                  Logout
                </button>
                <button className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
                  <User size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-neutral-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {activeTab === "feed" && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Feed</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((post) => (
                  <div
                    key={post}
                    className="bg-neutral-900 border border-neutral-800 rounded-md p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800" />
                      <div>
                        <p className="text-sm font-medium">Username</p>
                        <p className="text-xs text-neutral-500">2h ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300">
                      This is a sample post on PostVerse. Users can share their
                      thoughts here.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          
        </div>
      </main>
    </div>
  );
}
