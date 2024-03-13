import React from 'react'
import { Button, Card } from '../../components/ui'

export const MantenimientoPerfil = () => {
  return (
    <div>
        <Card>
            <h1 className='text-xl text-center font-bold'>Mantenimiento de Perfil</h1>
            <div>
                <div className='flex justify-end'>
                    <Button className="bg-blue-500 text-white p-2">Agregar Perfil</Button>
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
                        <tr>
                            <td>1001</td>
                            <td>Administrador</td>
                            <td >
                                <Button className="bg-green-500 text-white p-2">Editar</Button>
                                <Button className="bg-red-500 text-white p-2">Eliminar</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>Paciente</td>
                            <td >
                                <Button className="bg-green-500 text-white p-2">Editar</Button>
                                <Button className="bg-red-500 text-white p-2">Eliminar</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1003</td>
                            <td>Doctor</td>
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