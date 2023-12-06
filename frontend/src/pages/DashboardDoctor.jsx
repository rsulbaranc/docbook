import { Label, Input, Card, Button } from "../components/ui";
import { useForm } from "react-hook-form"
import { getUserRequest } from "../api/user";
import { getPatientRecordsRequest } from "../api/records";
import { useEffect, useState } from "react";

const DashboardDoctor = () => {

  const { register, handleSubmit } = useForm()

  const [patient, setPatient] = useState(null)
  const [records, setRecords] = useState([]);


  const onSubmit = handleSubmit(async (data) => {
    setPatient(null)
    console.log(data);
    const res = await getUserRequest(data)
    console.log(res);
    setPatient(res.data)
})

useEffect(() => {

  if (patient!= null) {
    
    const res = getPatientRecordsRequest(patient.id)
  }


}, [patient]);

  return (
    <div>
      <Card>
        <form onSubmit={onSubmit} className="flex gap-10 items-center">
          <Label>ID paciente: </Label>
          <Input type="text" name="id_paciente" className="w-1/2"
          {...register("id_paciente")}/>
          <Button>Buscar</Button>
        </form>
      </Card>

      {patient ? (
        <div className="mb-5">
        <Card className="mt-5">
          <h1 className="text-2xl font-bold">Paciente</h1>
          <p>{patient.name}</p>
          <p>{patient.username}</p>
          <p>{patient.email}</p>
          <p>{patient.profile}</p>
        </Card>
        </div>
      ) : <div></div>}


      {records.length > 0 ?  (
        
        records.map((record) => (
        <Card key={record.id_historia} className="px-7 py-4" >
          <h1>{record.id_historia}</h1>
          <p>{record.desc_historia}</p>
          <div className="my-2 flex justify-end gap-x-2">
            <Button>Editar</Button>
          </div>
        </Card>
      ))
      
      ) : patient && records.length === 0 ? (
        <Card className="px-7 py-4" >
          <h1>El usuario aun no tiene ninguna observacion
          </h1>
        </Card>
      ) : <div></div>}

      

    </div>
  );
};

export default DashboardDoctor;
