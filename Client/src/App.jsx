import React from 'react'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Feed from './Page/Feed'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Login/>} />
        <Route path="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App