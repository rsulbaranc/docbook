import React, { useEffect, useState } from 'react'
import { FaUserPlus } from 'react-icons/fa';
import { Button, Modal, Label, Input, Card, Select, Spinner } from '../../components/ui'
import { useForm } from 'react-hook-form';
import { createPermission, deletePermission, getAllPermissions, getAllProcess, getAllProfiles } from '../../api/admin';
import { toast } from 'react-toastify';

export const MantenimientoPermiso = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [modalPremission, setModalPremission] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    init();
  }, []);

  const init = async() => {

    await getProcesses();
    await getProfiles();
    await getPermissions();

  };

  const getProcesses = async () => {
    getAllProcess().then((res) => {
        const newProcesses = res.data.map((process) => {
            return {
                value: process.process_id,
                label: process.process_de
            }
        });
        setProcesses(newProcesses);
    });
  };

  const getPermissions = async () => {
    setIsLoading(true);
    getAllPermissions().then((res) => {
        console.log(res.data);
        setPermissions(res.data);
        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        setIsLoading(false);
    });
  };

  const getProfiles = async () => {
    getAllProfiles().then((res) => {
        const newProfiles = res.data.map((profile) => {
            return {
                value: profile.profile_id,
                label: profile.profile_na
            }
        });
        setProfiles(newProfiles);
    });
    };


  const permissionSubmit = handleSubmit((data) => {
    console.log(data);
    setIsLoading(true);
    createPermission(data).then((res) => {
      console.log(res.data);
      const newPermissions = [...permissions, res.data.data];
      console.log(newPermissions);
      setPermissions(newPermissions);
      toast.success(res.data.message);
      setModalPremission(false);
        setIsLoading(false);
    }).catch((err) => {
      toast.error(err.response.data.errorMessage);
      console.log(err);
        setIsLoading(false);
    });
  });

  const deletePermissionById = async (permission) => {
    setIsLoading(true);
    const idPermission = permission.permission_id;
    deletePermission(idPermission).then((res) => {
        console.log(res.data);
        const newPermissions = permissions.filter((permission) => permission.permission_id !== idPermission);
        setPermissions(newPermissions);
        toast.success(res.data.message);
        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        toast.error(err.response.data.errorMessage);
        setIsLoading(false);
    });
  };

  return (
    <div>
    <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de permisos</h1>
            <div>
                <div className='flex justify-end'>
                <Button onClick={() => setModalPremission(true)}>
                    <div className='flex items-center justify-center gap-1'>
                      <FaUserPlus/>
                      Asignar permiso
                    </div>
                </Button>
                <Modal btnClose={true} setCloseStatus={setModalPremission} openModal={modalPremission}>
                <div className='p-4'>
                    <h2 className="text-3xl font-bold my-4">
                    Asignar permisos
                    </h2>
                <form onSubmit={permissionSubmit} className='p-4 flex flex-col gap-4'>

                    <div>
                    <Select label="Proceso" options={processes} 
                    chooseOption="Seleccione un proceso"
                    returnValue={value => {
                        setValue("process_id", value);
                        } } />
                    </div>
                    
                    <div>
                    <Select label="Perfil" options={profiles} 
                    chooseOption="Seleccione un perfil"
                    returnValue={value => {
                        setValue("profile_id", value);
                        } } />
                    </div>
                    
                    <Button>Asignar</Button>
                </form>
              </div>
                </Modal>
                </div>
                <table className="w-full mt-3">
                    <thead>
                        <tr>
                            <th className="text-left">ID Permiso</th>
                            <th className="text-left">Perfil</th>
                            <th className="text-left">Proceso</th>
                            <th className="text-left">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.length > 0 ? permissions.map((permision) => (
                            <tr key={permision.permision_id}>
                                <td>{permision.permission_id}</td>
                                <td>{permision.profile_na}</td>
                                <td>{permision.process_de}</td>
                                <td className='py-2 flex justify-around'>
                                    <Button onClick={ () => deletePermissionById(permision) }  
                                    className='flex bg-red-600 hover:bg-red-400'>Eliminar</Button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="3">No hay registros</td></tr>}
                    </tbody>
                </table>
            </div>
        </Card>

        <Spinner isActive={isLoading} />
        </div>
  )
}
