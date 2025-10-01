import React from 'react'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Feed from './Page/Feed'
import Register from './Page/Register'
import Profile from './Page/Profile'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from './Page/Home'
import Login from './Page/Login'
import AdminPanel from './Page/AdminPanel'

const App = () => {
  return (
<BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App