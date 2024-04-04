import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { FaNotesMedical } from "react-icons/fa";
import { FaUserDoctor, FaGears  } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { MdOutlineSecurity } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";


const publicRoutes = [
  { label: "Login", path: "/login", current: false },
  { label: "Register", path: "/register", current: false },
];

const patientRoutes = [
  { label: "Home", path: "/", current: true, icon: <AiOutlineHome/>},
  { label: "Profile", path: "/profile", current: false, icon: <CgProfile />}
];

const doctorRoutes = [
  { label: "Home", path: "/dashboard", current: false , icon: <AiOutlineHome/>},
  { label: "Profile", path: "/profile", current: false, icon: <CgProfile /> },
  { label: "Create Record", path: "/createRecord", current: false, icon: <FaNotesMedical />},
  { label: "Register Patient", path: "/registerPatient", current: false, icon: <FaUserDoctor />},
]

const adminRoutes = [
  { label: "Home", path: "/dashboard", current: false , icon: <AiOutlineHome/>},
  { label: "Persona", path: "/mantenimiento/persona", current: false, icon: <FaPerson />},
  { label: "Usuario", path: "/mantenimiento/usuario", current: false, icon: <CgProfile /> },
  { label: "Perfil", path: "/mantenimiento/perfil", current: false, icon: <ImProfile />},
  { label: "Procesos", path: "/mantenimiento/procesos", current: false, icon: <FaGears />},
  { label: "Permisos", path: "/mantenimiento/permisos", current: false, icon: <MdOutlineSecurity />},

]

export const useRoutesInfo = (userProfile) => {

  let routes;

  switch(userProfile) {
    case 'patient':
      routes = patientRoutes;
      break;
    case 'doctor':
      routes = doctorRoutes;
      break;
    case 'admin':
      routes = adminRoutes;
      break;
    default:
      routes = publicRoutes;
  }

  return routes;
}
