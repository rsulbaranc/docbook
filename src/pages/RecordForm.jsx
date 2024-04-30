import {Button, Card, Input, Label, Textarea} from "../components/ui"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { createRecordRequest } from "../api/records"
import { toast } from "react-toastify"

const RecordForm = () => {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

   const onSubmit = handleSubmit(async (data) => {
    console.log(data);  
    const res = await createRecordRequest(data);
    console.log(res);

    if (res.status === 200) {
        toast.success('Historia Clinica creada con exito')
        navigate('/')
    } else {
        toast.error('Error al crear la historia clinica')
        console.log(res);
    } 
})

  return (
    
    <div className="h-[80vh] flex justify-center items-center">
        <Card>
            <h2 className="text-3xl font-bold my-4">
                Registrar Historia Clinica
            </h2>
            <form onSubmit={onSubmit}>
                <Label htmlFor="name">Cedula del paciente</Label>
                <Input type = "text" placeholder = "Cedula del paciente" 
                {...register("patient_ci")}
                />

                <Label htmlFor="name">Diagnostico</Label>
                <Input type = "text" placeholder = "escriba el diagnóstico" 
                {...register("history_dg")}
                />
                
                <Label htmlFor="Description">Descripcion</Label>
                <Textarea placeholder="Descripcion" rows={5}
                {...register("history_de")}
                ></Textarea>

                <Label htmlFor="Description">Recipe</Label>
                <Textarea placeholder="Escriba el recipe" rows={3}
                {...register("recipe_de")}
                ></Textarea>

                <Button>Create</Button>
            </form>
        </Card>
    </div>
  )
}

export default RecordForm