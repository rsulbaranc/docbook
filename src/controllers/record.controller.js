//Obtener todos los registros / Get all records
export const getRecords = (req, res) => {
  res.send("Getting records from the database...");
};

//Obtener un registro / Get a record
export const getRecord = (req, res) => {
  res.send("Getting record from the database...");
};

//Crear un registro / Create a record
export const createRecord = (req, res) => {
  res.send("Posting record to the database...");
};

//Actualizar un registro / Update a record
export const updateRecord = (req, res) => {
        res.send("Upadating record to the database...")
};

//Eliminar un registro / Delete a record
export const deleteRecord = (req, res) => {
        res.send("Deleting record from the database...")
};