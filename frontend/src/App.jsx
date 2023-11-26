//import React from 'react'}
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import {Profile} from './pages/Profile'
import Login from './pages/Login'
import {Register} from './pages/Register'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  )
}

export default App;