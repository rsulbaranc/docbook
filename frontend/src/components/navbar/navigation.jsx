import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';

export const navigation = () => {

  const publicRoutes = [
    { label: "Login", path: "/login", current: false },
    { label: "Register", path: "/register", current: false },
  ];
  
  const patientRoutes = [
    { label: "Home", path: "/", current: true, icon: <AiOutlineHome/>},
    { label: "Profile", path: "/profile", current: false }
  ];
  
  const doctorRoutes = [
    { label: "Home", path: "/dashboard", current: false},
    { label: "Profile", path: "/profile", current: false },
    { label: "Create Record", path: "/createRecord", current: false },
    { label: "Register Patient", path: "/registerPatient", current: false },
  ]
  

  return (
    <div>navigation</div>
  )
}
