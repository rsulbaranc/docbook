import "../../assets/css/sidebar.css"
import logo from "../../assets/img/LogoDocBook.png"
import { AiOutlineRight} from "react-icons/ai";
import { NavLink } from 'react-router-dom'
import { useRoutesInfo } from "./navigation";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";


export const Sidebar = ({sidebarOpened, setSidebarOpened}) => {

  const {  signout, user } = useAuth();
  const routes = useRoutesInfo(user?.profile);


const openSidebar = () => {
  setSidebarOpened(!sidebarOpened)
}

if (!user) {
  console.log("No user")
  return null; 
}

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
      <div className="sidebar-content">
      <div>
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
      </div>
      <div className="routesContainer">
        <div className='divider'></div>
          <div className="routes" style={{cursor: "pointer"}} onClick={signout}>
            <div className="routesIcon">
              <FaSignOutAlt />
            </div>
            { sidebarOpened && <span>Cerrar Sesión</span>}
          </div>
        <div className='divider'></div>
      </div>
      </div>
    </div>
  )
}
