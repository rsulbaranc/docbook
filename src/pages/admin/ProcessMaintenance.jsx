import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Label, Modal, Spinner } from '../../components/ui'
import { FaUserPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { createProcess, deleteProcess, getAllProcess, updateProcess } from '../../api/admin';
import { toast } from 'react-toastify';

export const MantenimientoProceso = () => {

  const [modalAdd, setModalAdd] = useState(false);
  const [processes, setProcesses] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [editProcess, setEditProcess] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProcesses();
  }, []);

  const getProcesses = async () => {
    setIsLoading(true);
    getAllProcess().then((res) => {
      console.log(res.data);
      setProcesses(res.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
  }


  const addProcess = handleSubmit((data) => {
    setIsLoading(true);
    if(!editProcess.process_id) {
      createProcess(data).then((res) => {
        console.log(res.data);
        const newProcesses = [...processes, res.data.data];
        setProcesses(newProcesses);
        toast.success(res.data.message);
        setModalAdd(false);
      }).catch((err) => {
        toast.error(err.response.data.errorMessage);
        console.log(err);
      });
    } else {
      const dataEdit = {
        ...data,
        process_id: editProcess.process_id
      }

      console.log(dataEdit);
      updateProcess(dataEdit).then((res) => {
        console.log(res.data);
        const newProcesses = processes.map((process) => {
          if(process.process_id === res.data.data.process_id) {
            return res.data.data;
          }
          return process;
        });
        setProcesses(newProcesses);
        toast.success(res.data.message);
        setModalAdd(false);
        setEditProcess({});
      }).catch((err) => {
        toast.error(err.response.data.errorMessage);
        console.log(err);
      });
    }
    setIsLoading(false);
    setEditProcess({});
  });

  const deleteProcessById = async (id) => {
    setIsLoading(true);
    await deleteProcess(id).then((res) => {
      console.log(res.data);
      const newProcesses = processes.filter((process) => process.process_id !== res.data.data.process_id);
      setProcesses(newProcesses);
      toast.success(res.data.message);
      
    }).catch((err) => {
      console.log(err);
      toast.error(err.response.data.errorMessage);

    });
    setIsLoading(false);
  }

  const addProcessModal = () => {
    setValue('process_de', '');
    setModalAdd(true);
  }

  return (
    <div>
    <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de procesos</h1>
            <div>
                <div className='flex justify-end'>
                <Button onClick={() => addProcessModal()}>
                    <div className='flex items-center justify-center gap-1'>
                      <FaUserPlus/>
                      Agregar un nuevo proceso
                    </div>
                </Button>
                <Modal btnClose={true} setCloseStatus={setModalAdd} openModal={modalAdd}>
                <div>
                    <h2 className="text-3xl font-bold my-4">
                    {editProcess ? 'Editar proceso' : 'Nuevo proceso'}
                    </h2>
                <form onSubmit={addProcess} className='p-4 flex flex-col gap-4'>

                    <div>
                      <Label htmlFor="name">{editProcess ? 'Editar proceso' : 'Nuevo proceso'}</Label>
                      <Input type = "text" placeholder = "escriba el proceso"
                      {...register("process_de")}/>
                    </div>

                    <Button>Guardar</Button>
                </form>
              </div>
                </Modal>
                </div>
                <table className="w-full mt-3">
                    <thead>
                        <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">Descripcion</th>
                            <th className="text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.length > 0 ? processes.map((process) => (
                            <tr key={process.process_id}>
                                <td>{process.process_id}</td>
                                <td>{process.process_de}</td>
                                <td className='py-2 flex justify-around'>
                                    <Button onClick={() => {
                                        setValue('process_de', process.process_de);
                                        setEditProcess(process);
                                        setModalAdd(true);
                                    } }>Editar</Button>
                                    <Button onClick={ () => deleteProcessById(process.process_id) }  className='flex bg-red-600 hover:bg-red-400'>Eliminar</Button>
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
