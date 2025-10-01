import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function Header() {
  const { user, logout } = useAuthStore();

  console.log('Header user:', { user }); // Debug

  return (
    <nav style={{ background: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
        <Link to="/feed" style={{ color: 'white', marginRight: '20px' }}>Feed</Link>
        {user && <Link to="/profile" style={{ color: 'white', marginRight: '20px' }}>Profile</Link>}
        {user && ['writer', 'editor', 'admin'].includes(user.role) && (
          <Link to="/create-post" style={{ color: 'white', marginRight: '20px' }}>Create Post</Link>
        )}
        {user && ['editor', 'admin'].includes(user.role) && (
          <Link to="/admin" style={{ color: 'white', marginRight: '20px' }}>Admin Panel</Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username} ({user.role})</span>
            <button
              onClick={logout}
              style={{ marginLeft: '10px', color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;