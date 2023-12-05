import { Navigate, Outlet } from "react-router-dom";

export const DoctorGuard = ({redirecTo, children, isAllowed, license}) => {

  
    if(!isAllowed || license !== 'doctor') return <Navigate to={redirecTo} replace/>
    
      return children ? children : <Outlet/>;
}
