import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Label, Textarea } from '../../components/ui'
import { Modal } from '../../components/ui/Modal'
import { FaUserPlus } from 'react-icons/fa'
import { get, useForm } from 'react-hook-form'
import { createProfile, deleteProfile, getAllProfiles, updateProfile } from '../../api/admin'

export const MantenimientoPerfil = () => {

    useEffect(() => {
        getProfiles()
    }, [])

    const [profiles, setProfiles] = useState([])
    const [profileForEdit, setProfileForEdit] = useState({})
    const [modalEdit, setModalEdit] = useState(false)

    const { register, handleSubmit, setValue } = useForm()

    const getProfiles = async () => {
        await getAllProfiles().then((res) => {
            console.log(res.data);
            setProfiles(res.data);
        });
    }

    const createSubmit = handleSubmit(async (data) => {
        await createProfile(data).then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.reload();
            }
        });
    });

    const editSubmit = handleSubmit(async (newName) => {
        const data = {
            ...newName,
            profile_id: profileForEdit.profile_id
        }
        await updateProfile(data).then( async (res) => {
            if (res.status === 200 && res.data.message === "Perfil actualizado") {
                await getProfiles();
                setModalEdit(false);
                //window.location.reload();
            }
        });
    }
    );

    const deleteOneProfile = async (id) => {
        deleteProfile(id).then((res) => {
            if (res.status === 200) {
                getProfiles();
            }
        });
    }

  return (
    <div>
        <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de Perfil</h1>
            <div>
                <div className='flex justify-end'>
                <Modal 
                    btnText={ 
                    <div className='flex items-center justify-center gap-1'>
                      <FaUserPlus />
                      Agregar Tipo de Perfil
                    </div>}
                    btnClose={true}
                    zIndex="z-10"
                    >
              <div>
              <h2 className="text-3xl font-bold my-4">
                Crear Perfil
            </h2>
            <form onSubmit={createSubmit}>
                <Label htmlFor="name">Nuevo perfil</Label>
                <Input type = "text" placeholder = "escriba el nuevo perfil" className="w-full p-2 my-2"
                {...register("profile_na")}
                />
                <Button>Crear</Button>
            </form>
              </div>
            </Modal>
                </div>
                <table className="w-full mt-3">
                    <thead>
                        <tr>
                            <th className="text-left">Rol ID</th>
                            <th className="text-left">Descripcion</th>
                            <th className="text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.length > 0 ? profiles.map((profile) => (
                            <tr key={profile.profile_id}>
                                <td>{profile.profile_id}</td>
                                <td>{profile.profile_na}</td>
                                <td>
                                    <Button onClick={() => {
                                        setProfileForEdit(profile); 
                                        setModalEdit(true);
                                        setValue('profile_na', profile.profile_na);
                                    } }>Editar</Button>
                                    <Button onClick={ () => deleteOneProfile(profile.profile_id) }>Eliminar</Button>
                                </td>

                            </tr>
                        )) : <tr><td colSpan="3">No hay registros</td></tr>}
                    </tbody>
                </table>
            </div>
        </Card>
        <Modal openModal={modalEdit} btnClose={true} setCloseStatus={setModalEdit}>
            <div>
                <h2 className="text-3xl font-bold my-4">Editar perfil</h2>
                <form onSubmit={editSubmit}>
                <Label htmlFor="name">Nombre del perfil</Label>
                <Input type = "text" placeholder = "escriba el nuevo perfil" className="w-full p-2 my-2" setValue={profileForEdit.profile_na}
                {...register("profile_na")}
                />
                <Button>Guardar</Button>
                </form>
            </div>
        </Modal>
    </div>
  )
}