import { useEffect, useState } from 'react'
import { Button, Card, Input, Label, Textarea } from '../../components/ui'
import { deleteUser, getAllUsers, getUser  } from '../../api/admin'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';

export const MantenimientoUsuario = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsers()
  }, 
  [])

  const [searchContent, setSearchContent] = useState('');

  const getUsers = async () => {
    await getAllUsers().then((res) => {
      setUsuarios(res.data);
    });
  }

  const searchUser = async (searchContent) => {
    console.log(searchContent);
    await getUser({id: searchContent}).then((res) => {
      console.log(res.data);
      setUsuarios(res.data);
    });
  } 

  const deleteUserById = async (id) => {
    await deleteUser({id: id}).then((res) => {
      console.log(res.data);

    });
    await getUsers();
    
  }

  const { register, handleSubmit } = useForm()

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
            <Modal 
            btnText={ 
            <div className='flex items-center justify-center gap-1'>
              <FaUserPlus />
              Agregar Usuario
            </div>}
            btnClose={true}
            >
              <div>
              <h2 className="text-3xl font-bold my-4">
                Create Record
            </h2>
            <form >
                <Label htmlFor="name">ID paciente</Label>
                <Input type = "text" placeholder = "Enter ID paciente" 
                {...register("id_paciente")}
                />
                
                <Label htmlFor="Description">Description</Label>
                <Textarea placeholder="Description" rows={3}
                {...register("desc_historia")}
                ></Textarea>

                <Button>Create</Button>
            </form>
              </div>
            </Modal>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <th >Nombre</th>
                <th >Cedula</th>
                <th >Perfil</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td >{usuario.name}</td>
                  <td >{usuario.email}</td>
                  <td >{usuario.profile !== null ? usuario.profile : 'N/A'}</td>
                  <td className='py-2 flex justify-around'>
                    <Button className='flex'>
                      <MdOutlineModeEdit />
                      Editar
                    </Button>
                    <Button onClick={() => { deleteUserById(usuario.id) } }  className='flex bg-red-600 hover:bg-red-400'> 
                      <FaRegTrashAlt /> Eliminar
                      </Button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4">No hay usuarios en la busqueda</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
