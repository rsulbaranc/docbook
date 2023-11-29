//import React from 'react'}
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import {Profile} from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App;