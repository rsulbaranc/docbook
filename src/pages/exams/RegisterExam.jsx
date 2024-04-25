import React from 'react'
import axios from '../../api/axios'
import { Button, Card, Input, Label, Textarea } from '../../components/ui'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";

export const RegisterExam = () => {
  const { register, handleSubmit } = useForm()

const onSubmit = async (data) => {
  const formData = new FormData();

  console.log(data);

  const params =  {
    patient_ci: data.patient_ci,
    exam_na: data.exam_na,
    exam_de: data.exam_de
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

        <Label htmlFor="title">Titulo del examen</Label>
        <Input type="text" placeholder="Titulo del examen" {...register("exam_na")} />

        <Label htmlFor="Description">Descripcion</Label>
        <Textarea placeholder="Descripcion" rows={5} {...register("exam_de")}></Textarea>

        <Label htmlFor="file">Archivo</Label>
        <Input 
          type="file" 
          {...register("file")} 
          accept="application/pdf" 
          onChange={(e) => {
            if (e.target.files[0].size > (5 * 1024 * 1024)) { // 5MB in bytes
              toast.info("Por favor, seleccione un archivo de menos de 5MB.")
              e.target.value = ""; // reset the file input
            }
          }} 
        />

        <div className="flex justify-center items-center mt-4">
          <Button type="submit">Enviar</Button>
        </div>

        </form>
      </Card>
    </div>
  )
}