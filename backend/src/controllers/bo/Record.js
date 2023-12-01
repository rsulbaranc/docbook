import  {pool}  from "../../db.js";
import bcrypt from "bcrypt";
import querys from "../../utils/querys.json" assert { type: "json" };

//console.log(pool)

let Record = class {
 

  
  //querys = querys.getRecord; 

    constructor(){
      this.db = pool;
      this.bycrypt = bcrypt;
      this.querys = querys.record;
    }

    hola(req, res){
      console.log("llego aqui")
      return "hola";
    }
  

    
    async getRecords  (req, res) {
        console.log(req.userId)
        const result = await this.db.query(record.getRecords);
        //console.log(result);
        return result.rows;
      };
      
      //Obtener un registro / Get a record
      async getRecord (req, res) {
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
      async createRecord  (params) {
        const { id_paciente, desc_historia, id_doctor } = params;
      
        try {
          const result = await pool.query(
            this.querys.createRecord,
            [id_paciente, desc_historia, id_doctor]
          );
          return result.rows[0];
        } catch (error) {
          if (error.code === "23505") {
            return {
              menssage: "This record already exist",
            }
          }
         return error;
        }
      };
      
      //Actualizar un registro / Update a record
      async updateRecord (req, res) {
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
      async deleteRecord (req, res) {
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
      
}

export default Record;