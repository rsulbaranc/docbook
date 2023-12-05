import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({redirecTo, children, isAllowed}) => {
  
  if(!isAllowed) return <Navigate to={redirecTo} replace/>
  
    return children ? children : <Outlet/>;
}
