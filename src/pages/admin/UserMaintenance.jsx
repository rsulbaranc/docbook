import { useEffect, useState } from 'react'
import { Button, Card, Input, Label, Select, Textarea } from '../../components/ui'
import { createUser, deleteUser, getAllProfiles, getAllUsers, getUser, updateUser  } from '../../api/admin'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Spinner } from '../../components/ui/Spinner';
import { toast } from 'react-toastify';

export const MantenimientoUsuario = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    init()
  }, 
  [])

  const [searchContent, setSearchContent] = useState('');
  const [modalUser, setModalUser] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);

  const { register, handleSubmit, setValue } = useForm()

  // Para el segundo formulario
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit
  } = useForm();

  const getUsers = async () => {
    setIsLoading(true);
    await getAllUsers().then((res) => {
      setUsuarios(res.data);
      setIsLoading(false);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getProfiles = async () => {
    setIsLoading(true);
    await getAllProfiles().then((res) => {
      const newProfiles = res.data.map((profile) => (profile.profile_na));
      console.log(newProfiles);
      setProfiles(newProfiles);
      setIsLoading(false);
    });
  }

  const init = async () => {
    await getUsers();
    await getProfiles();
  }

  const searchUser = async (searchContent) => {
    console.log(searchContent);
    setIsLoading(true)
    await getUser({id: searchContent}).then((res) => {
      console.log(res.data);
      setUsuarios(res.data);
      setIsLoading(false);
    });
  } 

  const deleteUserById = async (id) => {
    setIsLoading(true);

    await deleteUser({id: id}).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      getUsers();
    }).catch((err) => {
      console.log(err);
      if (err.response.data.errorMessage) toast.error(err.response.data.errorMessage);
      else toast.error('Ocurrio un error al eliminar el usuario');
      
    });
    setIsLoading(false);
    
  }

  const addUser = handleSubmit(async (data) => {

    if (data.user_pass !== data.confirm_user_pass) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (!data.user_na || !data.user_ci || !data.user_pass || !data.confirm_user_pass) {
      toast.error('Por favor llene todos los campos');
      return;
    }

    setIsLoading(true);
    createUser(data).then((res) => {
      console.log(res);
      toast.success(res.data);
      setModalUser(false);
      setIsLoading(false);
      getUsers();
    }).catch((err) => {
      const errorData = err.response.data;
      console.log(errorData);
      toast.error(errorData.errorMessage);
      setModalUser(false);
      setIsLoading(false);
    });
  });

  const changePassword = handleSubmitEdit(async (data) => {
    if (data.user_pass !== data.confirm_user_pass) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    await updateUser(data).then((res) => {
      console.log(res);
      getUsers();
      setModalEdit(false);
      toast.success(res.data);
    }).catch((err) => {
      console.log(err);
      if (err.response.data.errorMessage) toast.error(err.response.data.errorMessage);
      else toast.error('Ocurrio un error al cambiar la contraseña');
    });
    setIsLoading(false);

  });

  

  return (
    <div>
      <Card>
        <h1 className='text-xl text-center font-bold'>Matenimiento de Usuarios</h1>
        <div>
          <div className='flex justify-between' >
            <div>
              <input type="text" placeholder="Buscar Usuario" className="w-80 p-2 my-2" onChange={(e) => setSearchContent(e.target.value)}/>
              <button className="bg-blue-500 text-white p-2" onClick={() => searchUser(searchContent)}>Buscar</button>
            </div>
            <div className='flex justify-end gap-1 items-center'>
            <Button onClick={() => setModalUser(true)}>
              <div className='flex items-center justify-center gap-1'>
                <FaUserPlus />
                Agregar usuario
              </div>
            </Button>
            </div>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <th >ID</th>
                <th >Nombre de usuario</th>
                <th >Perfil</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? usuarios.map((user) => (
                <tr key={user.user_id}>
                  <td >{user.user_id}</td>
                  <td >{user.user_na}</td>
                  <td >{user.profile_na !== null ? user.profile_na : 'N/A'}</td>
                  <td className='py-2 flex justify-around'>
                    <Button className='flex' onClick={() => {
                      setValueEdit("user_na", user.user_na);
                      setValueEdit("user_id", user.user_id);
                      setModalEdit(true);
                    } }>
                      <MdOutlineModeEdit />
                      Cambiar contraseña
                    </Button>
                    <Button onClick={() => { deleteUserById(user.user_id) } }  className='flex bg-red-600 hover:bg-red-400'> 
                      <FaRegTrashAlt /> Eliminar
                      </Button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4">No hay usuarios en la busqueda</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <Spinner isActive={isLoading} />

      {/* modal para agregar usuario */}
      <Modal openModal={modalUser} btnClose={true} setCloseStatus={setModalUser}>
      <div className='p-8'>
        <h2 className="text-3xl font-bold my-2 text-center">
          Agregar usuario
        </h2>

        <form className='mt-8' onSubmit={addUser}>

        <div className='flex flex-col gap-4'>

          <div>
            <Label htmlFor="name">Nombre de usuario</Label>
            <Input type = "text" placeholder = "Nombre de usuario" {...register("user_na")}/>
          </div>
          
          <div>
            <Label htmlFor="name">Cedula de la persona</Label>
            <Input type = "text" placeholder = "Cedula de la persona" {...register("user_ci")}/>
          </div>
          
          <div>
            <Label htmlFor="name">Contraseña</Label>
            <Input type = "password" placeholder = "Contraseña" {...register("user_pass")}/>
          </div>
         
          <div>
            <Label htmlFor="name">Confirmar contraseña</Label>
            <Input type = "password" placeholder = "Confirmar contraseña" {...register("confirm_user_pass")}/>
          </div>

          <Select label="Perfil del usuario" options={profiles}  returnValue={value => {
            setValue("user_profile", value);} } className="w-full"/>
          
          <div className='mt-2 col-span-2 flex justify-center items-center'>
              <Button>Guardar</Button>
          </div>
        
        </div>

        </form>

      </div>
      </Modal>

      {/* modal para editar usuario */}
      <Modal openModal={modalEdit} btnClose={true} setCloseStatus={setModalEdit}>
        <div className='p-4'>
          <h2 className="text-3xl font-bold my-4">Restablecer contraseña</h2>
          <form onSubmit={changePassword} className='flex flex-col gap-4'>

            <div>
              <Label htmlFor="name">Nombre del usuario</Label>
              <Input type = "text" placeholder = "Nombre del usuario" disabled={true}
              {...registerEdit("user_na")}/>
            </div>

            <div>
              <Label htmlFor="name">Nueva contraseña</Label>
              <Input type = "password" placeholder = "Nueva contraseña" 
              {...registerEdit("user_pass")}/>
            </div>
            
            <div>
              <Label htmlFor="name">Confirmar contraseña</Label>
              <Input type = "password" placeholder = "Confirmar contraseña" 
              {...registerEdit("confirm_user_pass")}/>
            </div>
            
            <Button>Guardar</Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
