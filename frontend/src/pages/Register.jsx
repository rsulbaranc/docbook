import { Button, Card, Input } from "../components/ui";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-bold underline">Register</h1>

        <form onSubmit={onSubmit}>
          <Input placeholder="Enter your name" {...register("name")} />
          <Input placeholder="Enter your username" {...register("username")} />
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />

          <Button>Register</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
