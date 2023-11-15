import { pool } from "../db.js";

import querys from "../utils/querys.json" assert { type: 'json' };

const { record } = querys;



//Obtener todos los registros / Get all records
export const getRecords = async (req, res) => {
  console.log(req.userId)
  const result = await pool.query(record.getRecords);
  //console.log(result);
  return res.json(result.rows);
};

//Obtener un registro / Get a record
export const getRecord = async (req, res) => {
  const result = await pool.query(
    record.getRecord,
    [req.params.id]
  );
  console.log(result);
  if (result.rowCount === 0) {
    return res.status(404).json({
      menssage: "Record not found",
    });
  }
  return res.json(result.rows[0]);
};

//Crear un registro / Create a record
export const createRecord = async (req, res, next) => {
  const { id_paciente, desc_historia, id_doctor } = req.body;

  try {
    const result = await pool.query(
      record.createRecord,
      [id_paciente, desc_historia, id_doctor]
    );
    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({
        menssage: "This record already exist",
      });
    }
    next(error);
  }
};

//Actualizar un registro / Update a record
export const updateRecord = async (req, res) => {
  const id = req.params.id;
  const { desc_historia } = req.body;

  const result = await pool.query(record.updateRecord, [desc_historia, id]);
 
  if (result.rowCount === 0) {
    return res.status(404).json({
      menssage: "Record not found",
    });
  }

  return res.json(`Record ${id} updated Successfully`);
};

//Eliminar un registro / Delete a record
export const deleteRecord = async (req, res) => {
  const result = await pool.query(
    record.deleteRecord,
    [req.params.id]
  );
  console.log(result);
  if (result.rowCount === 0) {
    return res.status(404).json({
      menssage: "Record not found",
    });
  }
  return res.sendStatus(204);
};
