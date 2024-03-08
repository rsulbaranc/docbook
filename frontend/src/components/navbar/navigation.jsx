import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { FaNotesMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";


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

export const useRoutesInfo = (userProfile) => {

  let routes;

  switch(userProfile) {
    case 'patient':
      routes = patientRoutes;
      break;
    case 'doctor':
      routes = doctorRoutes;
      break;
    default:
      routes = publicRoutes;
  }

  return routes;
}
