import bcrypt from "bcrypt";
import querys from "../utils/querys.json" assert { type: "json" };
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

const { auth } = querys;


//Inicio de sesion / Signin
export const signin = async (req, res) => {

  const { username, password } = req.body;

  const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [username]);
  
  if (result.rowCount === 0){
    return res.status(400).json({message: "El usuario no existe"})
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  if(!validPassword){
    return res.status(400).json({message: "La contraseña es incorrecta"})
  }

  const token = await createAccessToken({ id: result.rows[0].id });

  res.cookie('token', token, { 
    //httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
  
  return res.json(result.rows[0]);
};


//Registro / Signup
export const signup = async (req, res, next) => {
  const { name, email, password, confirm_password } = req.body;

  

  const hashPasword = await bcrypt.hash(password, 10)
  const profile = 'patient'
  console.log(hashPasword)

    try {
    const result = await pool.query(auth.register, [name, email, hashPasword, profile]);

    const token = await createAccessToken({ id: result.rows[0].id, profile: result.rows[0].profile });

    res.cookie('token', token, { 
        //httpOnly: true, 
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    return res.json(result.rows[0]);
    } catch (error) {
        if(error.code === '23505'){
            return res.status(400).json({message: "El correo ya esta registrado"})
        }
        next(error);
    }

};

//Cerrar sesion / Signout
export const signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({message: "Sesion cerrada"})
};

//Perfil / Profile
export const profile = async (req, res) => {
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [req.userId]);
  return res.json(result.rows[0]);
};


export const user = async (req, res) => {
  console.log(req.body)
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [req.body.id]);
  console.log(result.rows[0])
  const {id, name} = result.rows[0]
  return res.json({id: id, name: name});
};