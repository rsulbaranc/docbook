import { pool } from "../db.js";

//Obtener todos los registros / Get all records
export const getRecords = async (req, res) => {
  const result = await pool.query("SELECT * FROM historia");
  console.log(result);
  return res.json(result.rows);
};

//Obtener un registro / Get a record
export const getRecord = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM historia WHERE id_historia = $1",
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
      "INSERT INTO historia (id_paciente, desc_historia, id_doctor) VALUES ($1, $2, $3) RETURNING *",
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
export const updateRecord = (req, res) => {
  res.send("Upadating record to the database...");
};

//Eliminar un registro / Delete a record
export const deleteRecord = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM historia WHERE id_historia = $1",
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
