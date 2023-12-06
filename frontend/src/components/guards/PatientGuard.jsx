import { Navigate, Outlet } from "react-router-dom";

export const PatientGuard = ({children, isAllowed, license}) => {

  
    if(!isAllowed) return <Navigate to="/login" replace/>
    if(license !== "patient") return <Navigate to="/dashboard" replace/>
    
      return children ? children : <Outlet/>;
}
