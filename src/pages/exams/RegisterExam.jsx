import React from 'react'
import axios from '../../api/axios'
import { Button, Card, Input, Label, Textarea } from '../../components/ui'
import { useForm } from 'react-hook-form'

export const RegisterExam = () => {
  const { register, handleSubmit } = useForm()

const onSubmit = async (data) => {
  const formData = new FormData();

  console.log(data);

  const params =  {
    patient_ci: data.patient_ci,
    history_dg: data.history_dg,
    history_de: data.history_de,
    recipe_de: data.recipe_de
  }
    formData.append("file", data.file[0]);
    formData.append("class", "Business");
    formData.append("method", "registerExam");
    formData.append("params", JSON.stringify(params));


  // Realiza la solicitud HTTP
  const response = await axios.post('/processFormData', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log(response.data);
}

  return (
    <div className="flex justify-center items-center">
      <Card>
        <h2 className="text-3xl font-bold my-4">
          Cargar examen
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Cedula del paciente</Label>
        <Input type="text" placeholder="Cedula del paciente" {...register("patient_ci")} />

        <Label htmlFor="name">Diagnostico</Label>
        <Input type="text" placeholder="escriba el diagnóstico" {...register("history_dg")} />

        <Label htmlFor="Description">Descripcion</Label>
        <Textarea placeholder="Descripcion" rows={5} {...register("history_de")}></Textarea>

        <Label htmlFor="Description">Recipe</Label>
        <Textarea placeholder="Escriba el recipe" rows={3} {...register("recipe_de")}></Textarea>

        <Label htmlFor="file">Archivo</Label>
        <Input type="file" {...register("file")} />

        <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </div>
  )
}