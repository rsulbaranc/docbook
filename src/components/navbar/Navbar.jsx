import { Link, useLocation } from "react-router-dom";
import { publicRoutes, patientRoutes, doctorRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  //console.log(location)

  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between py-3">
        <Link to="/">
          <h1 className="text-white font-bold text-2xl">DoockBook</h1>
        </Link>

        <ul className="flex gap-x-2">
        {isAuth ? (
            <>
                {(user.profile === 'patient' ? patientRoutes : user.profile === 'doctor' ? doctorRoutes : publicRoutes).map((item) => (
                    <li
                        className={` ${
                            location.pathname === item.href && "bg-sky-500 px-3 py-1 "
                        } `}
                        key={item.name}
                    >
                        <Link to={item.href} className="text-white">
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li
                    onClick={() => {
                        signout();
                    }}
                    className="text-white cursor-pointer"
                >
                    Signout
                </li>
            </>
        ) : (
            publicRoutes.map((item) => (
                <li
                    className={` ${
                        location.pathname === item.href && "bg-sky-500 px-3 py-1 "
                    } `}
                    key={item.name}
                >
                    <Link to={item.href} className="text-white">
                        {item.name}
                    </Link>
                </li>
            ))
        )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
