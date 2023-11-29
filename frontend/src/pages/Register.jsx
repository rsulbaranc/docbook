import { Button, Card, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    /*
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Credentials': true
      }
    });
    const result = await response.json();
    console.log(result); */
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true,
    });
    console.log(res);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">Register</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input placeholder="Enter your name" {...register("name")} />
          <Label htmlFor="username">Username</Label>
          <Input placeholder="Enter your username" {...register("username")} />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />

          <Button>Register</Button>

          <div className="flex justify-between my-4">
          <p>Already have an account? </p>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
