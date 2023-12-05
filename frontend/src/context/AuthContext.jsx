import axios from "../api/axios";
import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);

  const signin = async(data) => {
    try{
    const res = await axios.post("/signin", data);
    setUser(res.data);
    setIsAuth(true);
    return res.data;
  }
  catch(err){
    console.log(err);
    if (Array.isArray(err.response.data)){
     return setErrors(err.response.data);
    }
    setErrors([err.response.data.message]);
  }
    
  };

  const signup = async(data) => {
    try{
      const res = await axios.post("/signup", data);
    console.log(res);
    setUser(res.data);
    setIsAuth(true);
    return res.data;

    } catch (err){
      console.log(err);
      if (Array.isArray(err.response.data)){
        return setErrors(err.response.data);
      }
      setErrors([err.response.data.message]);
    }
    
  }

  const signout = async() => {
    await axios.post("/signout");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    if (Cookie.get('token')){
      axios
      .get("/profile")
      .then((res) => {
        setUser(res.data);
        setIsAuth(true);
      })
      .catch((err) => {
        setUser(null);
        setIsAuth(false);
        console.log(err);
      })
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, signin, signout}}>
      {children}
    </AuthContext.Provider>
  );
}
