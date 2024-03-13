import { Button, Card } from '../../components/ui'

export const MantenimientoEspecialidades = () => {
  return (
    <div>
        <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de Especialidades</h1>
            <div>
                <div className='flex justify-end'>
                    <Button className="bg-blue-500 text-white p-2">Agregar Especialidad</Button>
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
