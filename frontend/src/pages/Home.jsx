import { useAuth } from "../context/AuthContext";

const Home = () => {

  const data = useAuth();
  console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  )
}

export default Home;