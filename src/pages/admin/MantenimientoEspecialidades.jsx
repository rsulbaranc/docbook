import { useForm } from 'react-hook-form'
import { Button, Card, Input, Label, Textarea } from '../../components/ui'
import { Modal } from '../../components/ui/Modal'
import { FaUserPlus } from 'react-icons/fa'

export const MantenimientoEspecialidades = () => {
    const { register, handleSubmit } = useForm()
  return (
    <div>
        <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de Especialidades</h1>
            <div>
                <div className='flex justify-end'>
                <Modal 
            btnText={ 
            <div className='flex items-center justify-center gap-1'>
              <FaUserPlus />
              Agregar Especialidad
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
                <table className="w-full mt-3 table-auto">
                    <thead>
                        <tr>
                            <th className="text-left">Especialidad ID</th>
                            <th className="text-left">Descripcion</th>
                            <th className="text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1001</td>
                            <td>Cardiologia</td>
                            <td >
                                <Button className="bg-green-500 text-white p-2">Editar</Button>
                                <Button className="bg-red-500 text-white p-2">Eliminar</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>Neurologia</td>
                            <td >
                                <Button className="bg-green-500 text-white p-2">Editar</Button>
                                <Button className="bg-red-500 text-white p-2">Eliminar</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1003</td>
                            <td>Oftalmologia</td>
                            <td >
                                <Button className="bg-green-500 text-white p-2">Editar</Button>
                                <Button className="bg-red-500 text-white p-2">Eliminar</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  )
}
