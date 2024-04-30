import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
//import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Modal } from "../components/ui/Modal";

const Login = () => {

  const { signin, errors} = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    
    const user = await signin(data);
    if (user) navigate('/profile');

    /*
    console.log(data);
    const res = await axios.post("http://localhost:3000/api/signin", data,{
      withCredentials: true
    })
    console.log(res);*/
  });

  return (
    <div className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <Card>

        {
          errors && (
            errors.map((err, index) => (
              <p key={index} className="text-red-500 text-center">{err}</p>
            ))
          )
        }

        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesion</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="text">Usuario</Label>
          <Input type="text" placeholder="Enter your email" 
          {...register("username")}
          />

          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Enter your password" 
          {...register("password")}
          />

          <Button>Iniciar sesion</Button>
        </form>

        <div className="flex justify-between my-4 gap-1">
          <p>Aún no tienes una cuenta? </p>
          <Link to="/register" className="font-bold">
            Registrate
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
