import { useEffect, useState } from "react";
import { getRecordsRequest } from "../api/records";
import { Card } from "../components/ui";

const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecordsRequest().then((res) => {
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      {records.map((record) => (
        <Card key={record.id_historia}>
          <h1>{record.id_historia}</h1>
          <p>{record.desc_historia}</p>
        </Card>
      ))}
    </div>
  );
};

export default Home;
