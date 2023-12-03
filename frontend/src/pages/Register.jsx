import { Button, Card, Container, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const { signup, errors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data); 
    if (user) navigate('/profile');

  });

  return (
    <Container className="h-[calc(80vh-0rem)] flex items-center justify-center">
      <Card>

      {
          errors && (
            errors.map((err, index) => (
              <p key={index} className="text-red-500 text-center">{err}</p>
            ))
          )
        }

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
    </Container>
  );
};

export default Register;
