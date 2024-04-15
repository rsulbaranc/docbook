import { Label, Input, Card, Button, Spinner, Modal, Textarea } from "../components/ui";
import { get, set, useForm } from "react-hook-form"
import { getUserRequest } from "../api/user";
import { getPatientRecordsRequest, getRecipeRequest, updateRecipeRequest, updateRecordRequest } from "../api/records";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const DashboardDoctor = () => {

  const { register, handleSubmit } = useForm()

  const { 
    register: registerView, 
    handleSubmit: handleSubmitView, 
    setValue: setValueView 
  } = useForm()


  const { 
    register: registerRecipe, 
    handleSubmit: handleSubmitRecipe, 
    setValue: setValueRecipe 
  } = useForm()



  const {user} = useAuth();

  const [patient, setPatient] = useState(null)
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [historyView, setHistoryView] = useState({});
  const [modalRecipe, setModalRecipe] = useState(false);
  const [recipe, setRecipe] = useState({});


  const onSubmit = handleSubmit(async (data) => {

    setPatient(null)
    setRecords([])
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
    setPatient(res.data)
})


useEffect(() => {
  console.log(user)
  const fetchPatientRecords = async () => {
    if (patient != null) {
      setIsLoading(true);
      const res = await getPatientRecordsRequest(patient.id);
      if (res) setIsLoading(false);
      console.log(res);
      setRecords(res.data);
    }
  };

  fetchPatientRecords();
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
  await updateRecordRequest(data).then((res) => {
    console.log(res);
    const newRecords = records.map((record) => 
      record.history_id === data.history_id ? res.data.data : record
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

  const viewRecipe = async (history_id) => {
    setIsLoading(true);
    await getRecipeRequest(history_id).then((res) => {
      console.log(res);
      setRecipe(res.data);
      setValueRecipe("recipe_de", res.data.description);
      setValueRecipe("recipe_id", res.data.recipe_id);
      setModalRecipe(true);
    }).catch((err) => {
      console.log(err);
      toast.error("No se pudo obtener el recipe");
    })
    setIsLoading(false);
  }

  const recipeSubmit = handleSubmitRecipe(async (data) => {
    setIsLoading(true);
    updateRecipeRequest(data).then((res) => {
      console.log(res);
      toast.success(res.data.message);
    }).catch((err) => {
      console.log(err);
      toast.error("No se pudo actualizar el recipe");
    })
    setIsLoading(false);
    setModalRecipe(false);
  });


  return (
    <div>

      <h1 className="text-3xl font-bold my-2 mb-4 text-center">Doctor {user.username}</h1>

      <Card>
        <form onSubmit={onSubmit} className="flex gap-10 items-center">
          <Label>Cedula del paciente</Label>
          <Input type="text" name="id_paciente" className="w-1/2"
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
        <Card key={record.history_id} className="px-7 py-4" >
          <h2 className="text-xl font-bold">Diagnostico: {record.history_dg}</h2>
          <p>Por el doctor: {record.doctor_na} {record.doctor_la} el {formatDate(record.history_da)}</p>
          <div className="my-2 flex justify-end gap-x-2">
            <Button onClick={() => {
              setShowModal(true);
              setHistoryView(record);
              setValueView("history_dg", record.history_dg);
              setValueView("history_de", record.history_de);
              setValueView('history_id', record.history_id);
              console.log(historyView);
              console.log(user.id)
              } }>Ver detalle</Button>

            <Button onClick={() => viewRecipe(record.history_id)}>Ver recipe</Button>
          </div>
        </Card>
      ))
      
      ) : patient && records.length === 0 ? (
        <Card className="px-7 py-4" >
          <h1>El usuario aun no tiene ninguna observacion
          </h1>
        </Card>
      ) : <div></div>}

      <Spinner isActive={isLoading}/>

      {/* modal detalle */}
      <Modal openModal={showModal} btnClose={true} setCloseStatus={setShowModal} className="w-100">
      <h2 className="text-3xl font-bold my-2 text-center">
          Historia N° {historyView.history_id}
        </h2>

        <form onSubmit={editSubmit}>
          <div className="grid grid-cols-2 gap-4">
           <div>
              <Label>Diagnostico</Label>
              <Input type="text" name="diagnostic"
              {...registerView("history_dg")}
              disabled={historyView.doctor_id !== user.id}/>
           </div>

           <div>
              <Label>Fecha</Label>
              <Input type="text" name="date" value={formatDate(historyView.history_da)} disabled/>
           </div>

           <div>
            <Label>Paciente</Label>
            <Input type="text" name="patient" value={patient ? patient.name : ''} disabled/>
           </div>

           <div>
            <Label>Edad</Label>
            <Input type="text" name="age" value={patient ? patient.age: ''} disabled/>
           </div>

           <div className="col-span-2">
              <Label>Descripción</Label>
              <Textarea name="description" 
              {...registerView("history_de")}
              disabled={historyView.doctor_id !== user.id}
              rows={5}
              />
           </div>

           {historyView.doctor_id === user.id ? (
              <div className="col-span-2 flex items-center justify-center">
                <Button>Editar</Button>
              </div>
            ) : <></>}

           
          </div>

        </form>

      </Modal>

      {/* modal recipe */}
      <Modal openModal={modalRecipe} btnClose={true} setCloseStatus={setModalRecipe} className="w-100">
        <h2 className="text-3xl font-bold my-2 text-center">
          Recipe
        </h2>

        <form onSubmit={recipeSubmit}>
          <div className="grid grid-cols-2 gap-4">

            <div>
            <Label>Diagnostico</Label>
            <Input type="text" name="diagnostic" 
            value={recipe.diagnostic ? recipe.diagnostic : ''}
            disabled
            />
            </div>

            <div>
            <Label>Paciente</Label>
            <Input type="text" name="patient" value={patient ? patient.name : ''} disabled/>
           </div>

          <div className="col-span-2">
            <Label>Indicaciones</Label>
            <Textarea name="recipe_de"
            {...registerRecipe("recipe_de")}
            rows={5}
            disabled={recipe.doctor_id !== user.id}
            />
          </div>

          {recipe.doctor_id === user.id ? (
              <div className="col-span-2 flex items-center justify-center">
                <Button>Editar</Button>
              </div>
            ) : <></>}
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default DashboardDoctor;
