import bcrypt from "bcrypt";
import querys from "../utils/querys.json" assert { type: "json" };
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

const { auth } = querys;


//Inicio de sesion / Signin
export const signin = async (req, res) => {

    let _clase = await import(`./bo/${req.body.object}.js`);
    let obj = new _clase.default();
    let p = null;
    let r = null;
    if(req.body.params){
      r = obj[req.body.method](req.body.params);
    }
    else{
      r = obj[req.body.method]();
    }
    
    if(typeof r ==='string') res.send(r);
    if(typeof r ==='object') res.json(r);
};

//Registro / Signup
export const signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  const hashPasword = await bcrypt.hash(password, 10)

  console.log(hashPasword)

    try {
    const result = await pool.query(auth.register, [name, email, hashPasword]);

    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie('token', token, { 
        httpOnly: true, 
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    return res.json(result.rows[0]);
    } catch (error) {
        if(error.code === '23505'){
            return res.status(400).json({message: "El correo ya esta registrado"})
        }
    }

};

//Cerrar sesion / Signout
export const signout = (req, res) => res.send("signout");

//Perfil / Profile
export const profile = (req, res) => res.send("profile");
