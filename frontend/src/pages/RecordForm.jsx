import {Button, Card, Input, Label, Textarea} from "../components/ui"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { createRecordRequest } from "../api/records"

const RecordForm = () => {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

   const onSubmit = handleSubmit(async (data) => {
    const res = await createRecordRequest(data);
    console.log(res);
    if (res.status === 200) {
        navigate('/')
    } else {
        console.log(res);
    }
})

  return (
    
    <div className="h-[80vh] flex justify-center items-center">
        <Card>
            <h2 className="text-3xl font-bold my-4">
                Create Record
            </h2>
            <form onSubmit={onSubmit}>
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
        </Card>
    </div>
  )
}

export default RecordForm