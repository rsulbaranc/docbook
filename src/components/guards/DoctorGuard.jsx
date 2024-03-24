import { Navigate, Outlet } from "react-router-dom";

export const DoctorGuard = ({ children, isAllowed, license}) => {

    if(!isAllowed) return <Navigate to="/login" replace/>
    if(license !== "doctor") return <Navigate to="/" replace/>

  
  
  
    
      return children ? children : <Outlet/>;
}
