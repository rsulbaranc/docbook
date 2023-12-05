import { useEffect, useState } from "react";
import { deleteRecordRequest, getRecordsRequest } from "../api/records";
import { Button, Card } from "../components/ui";

const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecordsRequest().then((res) => {
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

  const deleteRecord = async(id) => {
    const res = await deleteRecordRequest({id: id})
    console.log(res);
    if (res.status === 200) {
      window.location.reload();
    } else {
      alert("No se pudo eliminar el registro");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {records.map((record) => (
        <Card key={record.id_historia} className="px-7 py-4">
          <h1>{record.id_historia}</h1>
          <p>{record.desc_historia}</p>
          <div className="my-2 flex justify-end gap-x-2">
            <Button>Editar</Button>
            <Button className="bg-red-500 hover:bg-red-800"
            onClick={() => {
              if(window.confirm("¿Está seguro de eliminar el registro?") === true){
                deleteRecord(record.id_historia);
              }  
            }}
            >Eliminar</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
