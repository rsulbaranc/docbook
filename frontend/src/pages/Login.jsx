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

        <h1 className="text-4xl font-bold my-2 text-center">Sign in</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Enter your email" 
          {...register("username")}
          />

          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Enter your password" 
          {...register("password")}
          />

          <Button>Sign in</Button>
        </form>

        <div className="flex justify-between my-4">
          <p>Don{"'"}t have an account? </p>
          <Link to="/register" className="font-bold">
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
