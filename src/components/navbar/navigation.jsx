import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { FaMicroscope, FaNotesMedical, FaSearch } from "react-icons/fa";
import { FaUserDoctor, FaGears  } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { MdOutlineSecurity } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";


const publicRoutes = [
  { label: "Login", path: "/login", current: false },
  { label: "Register", path: "/register", current: false },
];

const patientRoutes = [
  { label: "Inicio", path: "/", current: true, icon: <AiOutlineHome/>},
  { label: "Exanenes", path: "/examen/paciente", current: false, icon: <FaMicroscope />},
  { label: "Perfil", path: "/profile", current: false, icon: <CgProfile />},
];

const doctorRoutes = [
  { label: "Inicio", path: "/dashboard", current: false , icon: <AiOutlineHome/>},
  { label: "Consultar examen", path: "/examen/consulta", current: false, icon: <FaMicroscope />},
  { label: "Registrar historia", path: "/createRecord", current: false, icon: <FaNotesMedical />},
  { label: "Registrar paciente", path: "/registerPatient", current: false, icon: <FaUserDoctor />},
  { label: "Perfil", path: "/profile", current: false, icon: <CgProfile /> },
]

const adminRoutes = [
  { label: "Persona", path: "/mantenimiento/persona", current: false, icon: <FaPerson />},
  { label: "Usuario", path: "/mantenimiento/usuario", current: false, icon: <CgProfile /> },
  { label: "Perfil", path: "/mantenimiento/perfil", current: false, icon: <ImProfile />},
  { label: "Procesos", path: "/mantenimiento/procesos", current: false, icon: <FaGears />},
  { label: "Permisos", path: "/mantenimiento/permisos", current: false, icon: <MdOutlineSecurity />},

]

const bioanalistRoutes = [
  { label: "Consultar examen", path: "/examen/consulta", current: false, icon: <FaMicroscope />},
  { label: "Registrar examen", path: "/examen/registrar", current: false, icon: <FaNotesMedical />},
];

export const useRoutesInfo = (userProfile) => {

  let routes;

  switch(userProfile) {
    case 'paciente':
      routes = patientRoutes;
      break;
    case 'doctor':
      routes = doctorRoutes;
      break;
    case 'admin':
      routes = adminRoutes;
      break;
    case 'bioanalista':
      routes = bioanalistRoutes;
      break;
    default:
      routes = publicRoutes;
  }

  return routes;
}
