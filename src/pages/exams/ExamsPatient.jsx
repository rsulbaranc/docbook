import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Card, Input, Label, Modal, Spinner, Textarea, Button } from '../../components/ui';
import { getPatientExamns } from '../../api/exams';
import { useForm } from 'react-hook-form';
import { API } from '../../api';

export const ExamsPatient = () => {

    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [exams, setExams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [examView, setExamView] = useState({});

    const { register, handleSubmit, setValue } = useForm();

   useEffect(() => {
    console.log(user)
  
    fetchPatientExam();
  }, [user]);

  const fetchPatientExam = async () => {
   const id = user && (user.person_id ? user.person_id : user.id);
  if (user != null) {
    setIsLoading(true);
    await getPatientExamns(id).then((res) => {
      console.log(res);
      setExams(res.data);
    }).catch((err) => {
        console.log(err);
        setIsLoading(false);
        })
    setIsLoading(false);

  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
        <h1 className="text-3xl font-bold my-2 mb-4 text-center">Examenes de laboratorio</h1>

        {exams.length > 0 ?  (
      
      exams.map((exam) => (
      <Card key={exam.exam_id} className="px-7 py-4 mb-4" >
        <h2 className="text-xl font-bold">{exam.exam_na}</h2>
        <p>Por el doctor: {exam.doctor_na} {exam.doctor_la} el {formatDate(exam.exam_da)}</p>
        <div className="my-2 flex justify-end gap-x-2">
          <Button onClick={() => {
            setShowModal(true);
            setExamView(exam);
            setValue("exam_de", exam.exam_de);
            } }>Ver detalle</Button>
        </div>
      </Card>
    ))
    
    ) : user && exams.length === 0 ? (
      <Card className="px-7 py-4" >
        <h1>El usuario aun no tiene ningun examen
        </h1>
      </Card>
    ) : <div></div>}

     {/* modal detalle */}
     <Modal openModal={showModal} btnClose={true} setCloseStatus={setShowModal} className="w-100">
    <h2 className="text-3xl font-bold my-2 text-center">
        {examView.exam_na}
      </h2>

      <form >
        <div className="grid grid-cols-2 gap-4">

         <div>
            <Label>Fecha</Label>
            <Input type="text" name="date" value={formatDate(examView.exam_da)} disabled/>
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
            {...register("exam_de")}
            disabled={true}
            rows={5}
            />
         </div>
         
        </div>

      </form>

    </Modal>

    <Spinner isActive={isLoading}/>
    </div>
  )
}
