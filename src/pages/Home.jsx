import { useEffect, useState } from "react";
import { deleteRecordRequest, getPatientRecordsRequest, getRecipeRequest, getRecordsRequest } from "../api/records";
import { Button, Card, Input, Label, Modal, Spinner, Textarea } from "../components/ui";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const Home = () => {

  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalRecipe, setModalRecipe] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecords();
  }, []);


  const getRecords = async() => {
    setIsLoading(true);
    await getRecordsRequest().then((res) => {
      setRecords(res.data);
      console.log(res.data);
    }).catch((err) => {
      setRecords([]);
      setIsLoading(false);
    });

    setIsLoading(false);
  }

  const viewRecipe = async (history_id, fname, lname) => {
    setIsLoading(true);
    await getRecipeRequest(history_id).then((res) => {
      console.log(res);
      const recipe = {
        ...res.data,
        doctor: `${fname} ${lname}`
      }
      setRecipe(recipe);
      setModalRecipe(true);
    }).catch((err) => {
      console.log(err);
      toast.error("No se pudo obtener el recipe");
    })
    setIsLoading(false);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  

  return (
    <div className="">
      <h1 className="text-3xl bold">Historias clinicas</h1>
      {records.length > 0 ?  (
        
        records.map((record) => (
        <Card key={record.history_id} className="px-7 py-4" >
          <h2 className="text-xl font-bold">Diagnostico: {record.history_dg}</h2>
          <p>Por el doctor: {record.doctor_na} {record.doctor_la} el {formatDate(record.history_da)}</p>
          <div className="my-2 flex justify-end gap-x-2">
            <Button onClick={() => {
              setRecord(record);
              setShowModal(true);
              } }>Ver detalle</Button>

            <Button onClick={() => 
              viewRecipe(record.history_id, record.doctor_na, record.doctor_la)
            }>Ver recipe</Button>
          </div>
        </Card>
      ))
      
      ) : records.length === 0 ? (
        <Card className="px-7 py-4" >
          <h1>El usuario aun no tiene ninguna observacion
          </h1>
        </Card>
      ) : <div></div>}

      <Modal openModal={showModal} setCloseStatus={setShowModal} btnClose={true}>
        
      <div>
        <h2 className="text-3xl font-bold my-2 text-center">
          Historia clinica
        </h2>
        <div className="grid grid-cols-2 gap-4 p-6">
          <div>
              <Label>Nº de historia</Label>
              <Input type="text" name="history_id" value={record.history_id} disabled/>
          </div>

           <div>
              <Label>Fecha</Label>
              <Input type="text" name="date" value={formatDate(record.history_da)} disabled/>
           </div>

           <div>
              <Label>Diagnostico</Label>
              <Input type="text" name="diagnostic"
              value={record.history_dg}
              disabled/>
           </div>

           <div>
            <Label>Doctor</Label>
            <Input type="text" name="doctor" value={`${record.doctor_na} ${record.doctor_la}`} disabled/>
           </div>

           <div className="col-span-2">
              <Label>Descripción</Label>
              <Textarea name="description" 
              value={record.history_de}
              disabled
              rows={10}
              />
           </div>
        </div>
      </div>
      
      </Modal>

      <Modal openModal={modalRecipe} setCloseStatus={setModalRecipe} btnClose={true}>
        <div>
          <h2 className="text-3xl font-bold my-2 text-center">
            Recipe
          </h2>

          <div className="grid grid-cols-2 gap-4 p-6">
          <div>
              <Label>Diagnostico</Label>
              <Input type="text" name="diagnostic"
              value={recipe.diagnostic}
              disabled/>
           </div>

           <div>
              <Label>Doctor</Label>
              <Input type="text" name="diagnostic"
              value={recipe.doctor}
              disabled/>
           </div>

           <div className="col-span-2">
              <Label>Indicaciones</Label>
              <Textarea name="description" 
              value={recipe.description}
              disabled
              rows={10}
              />
           </div>
            
          </div>


        </div>
      </Modal>

      <Spinner isActive={isLoading}/>
    </div>
  );
};

export default Home;
