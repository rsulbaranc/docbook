import "../../assets/css/sidebar.css"
import logo from "../../assets/img/logo_alternativo_docbook.png"
import { AiOutlineRight, AiOutlineHome, AiOutlineShoppingCart, AiOutlineBarChart , AiOutlineSetting  } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import { useRoutesInfo } from "./navigation";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";


export const Sidebar = ({sidebarOpened, setSidebarOpened}) => {

  const { isAuth, signout, user } = useAuth();

const optionsArray = [
  {
    label: "Perfil",
    path: "/",
    icon: <AiOutlineSetting />,
  },
  {
    label: "Salir",
    path: "/home",
    icon: <MdOutlineLogout/>,
  }
]

const openSidebar = () => {
  setSidebarOpened(!sidebarOpened)
}

const routes = useRoutesInfo(user.profile);

  return (
    <div className='contain'>
      <button onClick={openSidebar} className={sidebarOpened ? 'sidebar-btn active' : 'sidebar-btn'}>
      <AiOutlineRight />
      </button>
      <div className='logoContent'>
        <div className={sidebarOpened ? 'imgContent active' : 'imgContent'}>
          <img src={logo} alt='logo'/>
        </div>
        <h2 className={sidebarOpened ? 'name active text-2xl font-bold' : 'name'}>DocBook</h2>
      </div>
      {routes.map(({icon, path, label}) => (
        <div className='routesContainer' key={label}>
          <NavLink to={path} className="routes" activeClassName="active">
            <div className='routesIcon'>
            {icon}
            </div>
            {
              sidebarOpened && <span>{label}</span>
            }
          </NavLink>
        </div>
      ))}
      <div className='divider'></div>
      {/* {optionsArray.map(({icon, path, label}) => (
        <div className='routesContainer' key={label}>
          <NavLink to={path} className="routes" activeClassName="active">
            <div className='routesIcon'>
              {icon}
            </div>
            {
              sidebarOpened && <span>{label}</span>
            }
          </NavLink>
        </div>
      ))} */}

      <div className="routesContainer">
        <div className="routes" style={{cursor: "pointer"}} onClick={signout}>
          <div className="routesIcon">
            <FaSignOutAlt />
          </div>
          { sidebarOpened && <span>Cerrar Sesión</span>}
        </div>
      </div>
      <div className='divider'></div>
    </div>
  )
}
