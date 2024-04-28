import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Label, Modal, Spinner, Textarea } from '../../components/ui';
import { toast } from "react-toastify";
import { getUserRequest } from '../../api/user';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { getPatientExamns, updateExam } from '../../api/exams';
import { API } from '../../api';

export const Exams = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState(null);
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [examView, setExamView] = useState({});

    const { register, handleSubmit } = useForm();
    const { 
        register: registerView, 
        handleSubmit: handleSubmitView, 
        setValue: setValueView 
      } = useForm()

    const {user} = useAuth();
    const onSubmit = handleSubmit(async (data) => {

        setPatient(null)
        // setRecords([])
        console.log(data);
        setIsLoading(true);
        await getUserRequest(data).then((res) => {
          console.log(res);
          setIsLoading(false);
          setPatient(res.data)
        }).catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        })
        setIsLoading(false);
    })

    useEffect(() => {
        console.log(user)
        const fetchPatientExam = async () => {
          if (patient != null) {
            setIsLoading(true);
            const res = await getPatientExamns(patient.id);
            if (res) setIsLoading(false);
            console.log(res);
            setRecords(res.data);
          }
        };
      
        fetchPatientExam();
      }, [patient]);

      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
      
      if (!user) {
        console.log("No user")
        return null; 
      }

      const editSubmit = handleSubmitView(async (data) => {
        setIsLoading(true);
        await updateExam(data).then((res) => {
          console.log(res);
          const newRecords = records.map((record) => 
            record.exam_id === data.exam_id ? res.data.data : record
          );
          setRecords(newRecords);
          toast.success(res.data.message);
          setShowModal(false);
          console.log(records);
        }).catch((err) => {
          console.log(err);
        })
        setIsLoading(false);
      });

  return (
    <div>

    <h1 className="text-3xl font-bold my-2 mb-4 text-center">Examenes de laboratorio</h1>

    <Card>
      <form onSubmit={onSubmit} className="flex gap-10 items-center">
        <Label>Cedula del paciente</Label>
        <Input type="text" name="id_paciente" className="w-6/12"
        {...register("patient_ci")}/>
        <Button>Buscar</Button>
      </form>
    </Card>

    {patient ? (
      <div className="mb-5">
      <Card className="mt-5">
        <h1 className="text-2xl font-bold">Paciente</h1>
        <p>{patient.name}</p>
        <p>Edad: {patient.age}</p>
        <p>{patient.email}</p>
        <p>{patient.profile}</p>
      </Card>
      </div>
    ) : <div></div>}


    {records.length > 0 ?  (
      
      records.map((record) => (
      <Card key={record.exam_id} className="px-7 py-4" >
        <h2 className="text-xl font-bold">{record.exam_na}</h2>
        <p>Por el doctor: {record.doctor_na} {record.doctor_la} el {formatDate(record.exam_da)}</p>
        <div className="my-2 flex justify-end gap-x-2">
          <Button onClick={() => {
            setShowModal(true);
            setExamView(record);
            setValueView("exam_na", record.exam_na);
            setValueView("exam_de", record.exam_de);
            setValueView('exam_id', record.exam_id);
            console.log(examView);
            console.log(user.id)
            } }>Ver detalle</Button>
        </div>
      </Card>
    ))
    
    ) : patient && records.length === 0 ? (
      <Card className="px-7 py-4" >
        <h1>El usuario aun no tiene ningun examen
        </h1>
      </Card>
    ) : <div></div>}

    <Spinner isActive={isLoading}/>

    {/* modal detalle */}
    <Modal openModal={showModal} btnClose={true} setCloseStatus={setShowModal} className="w-100">
    <h2 className="text-3xl font-bold my-2 text-center">
        {examView.exam_na}
      </h2>

      <form onSubmit={editSubmit}>
        <div className="grid grid-cols-2 gap-4">
         {/* <div>
            <Label>Diagnostico</Label>
            <Input type="text" name="diagnostic"
            {...registerView("exam_na")}
            disabled={examView.doctor_id !== user.id}/>
         </div> */}

         <div>
            <Label>Fecha</Label>
            <Input type="text" name="date" value={formatDate(examView.exam_da)} disabled/>
         </div>

         <div>
          <Label>Paciente</Label>
          <Input type="text" name="patient" value={patient ? patient.name : ''} disabled/>
         </div>

         <div>
          <Label>Edad</Label>
          <Input type="text" name="age" value={patient ? patient.age: ''} disabled/>
         </div>
         
         <div className='flex flex-col justify-center items-center'>
            <Label className="invisible">Archivo adjunto</Label>
            <a href={`${API}/uploads/${examView.exam_fp}`} target="_blank"
             rel="noopener noreferrer" className="button-class">
                Ver archivo adjunto
            </a>
        </div>

         <div className="col-span-2">
            <Label>Descripción</Label>
            <Textarea name="description" 
            {...registerView("exam_de")}
            disabled={examView.doctor_id !== user.id}
            rows={5}
            />
         </div>

         {examView.doctor_id === user.id ? (
            <div className="col-span-2 flex items-center justify-center">
              <Button>Editar</Button>
            </div>
          ) : <></>}

         
        </div>

      </form>

    </Modal>


  </div>
  )
}
