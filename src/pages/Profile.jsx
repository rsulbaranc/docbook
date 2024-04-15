import { Link } from 'react-router-dom';
import { Button, Card, Input, Label, Modal } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Profile = () => {

  const {user} = useAuth();

  if (!user) {
    console.log("No user")
    return null; 
  }

  const [changePassword, setChangePassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const passwordSubmit = async (data) => {}

  return (
    <div>

<Card>



<div className="text-4xl font-bold my-2 text-center">
<h1 >Perfil</h1>
<h2 className='text-2xl font-light'>Bienvenido {user.profile} {user.name}!</h2>
</div>


<div className='flex justify-center items-center gap-4'>

<div>
  <Label htmlFor="name">Nombre de usuario</Label>
  <Input type="text" value={user.username} />
</div>

<div >
  <Label htmlFor="id">Cedula</Label>
  <Input type="text" value={user.ci} />
</div>

</div>
 
<div className="flex flex-col my-4 items-center justify-center gap-2">
  <Link to="/register" className="font-bold">
    <Button>Ir al Inicio</Button>
  </Link>

  <Button onClick={() => setChangePassword(true)}>Cambiar contraseña</Button>
</div>

</Card>


<Modal openModal={changePassword} setCloseStatus={setChangePassword} btnClose={true}>
  <div className='p-4'>
    <h2 className="text-3xl font-bold my-2 text-center">Cambiar contraseña</h2>
    <form className='mt-2'>
      <div>
        <Label htmlFor="password">Contraseña actual</Label>
        <Input type="password" name="password" placeholder="Escribe tu contraseña actual" 
        {...register("current_password")}/>
      </div>
      <div>
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input type="password" name="password" placeholder="Escribe tu nueva contraseña" 
        {...register("new_password")}/>
      </div>
      <div>
        <Label htmlFor="password">Repetir contraseña</Label>
        <Input type="password" name="password" placeholder="Repite tu nueva contraseña" 
        {...register("confirm_password")}/>
      </div>

      <div className='mt-2 col-span-2 flex justify-center items-center'>
        <Button>Cambiar</Button>
      </div>
    </form>
  </div>
</Modal>

      </div>
  )
}
