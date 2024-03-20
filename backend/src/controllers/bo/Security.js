import  { pool }  from "../../db.js";
import bcrypt from "bcrypt";
import querys from "../../utils/querys.json" assert { type: "json" };

let Security = class {

    constructor() {
        this.db = pool;
        this.bycrypt = bcrypt;
        this.querys = querys;
    }

    init = async () => {
        let client = await pool.connect();
        try {
            const result = await client.query(this.querys.security.checkAdminExists);
            const adminExists = result.rows[0].count > 0;
           
            if (!adminExists) {
                try {
                    const hashedPassword = await this.bycrypt.hash('admin123', 10);
                    await client.query("BEGIN");
                    const profileResult = await client.query(this.querys.security.createAdminProfile);
                    const userResult = await client.query(this.querys.security.createAdminUser, ['administrador', hashedPassword]);
                    const profileID = profileResult.rows[0].profile_id;
                    const userID = userResult.rows[0].user_id;
                    await client.query(this.querys.security.createProfileUser, [profileID, userID]);
                    await client.query("COMMIT");
                    console.log("Admin user created");
                } catch (error) {
                    console.log(error);
                    await client.query("ROLLBACK");
                }
                //console.log(`el id del perfil es: ${id1} y el del usuario ${id2}`);
                //await this.db.query(this.querys.auth.register, ['administrador', 'admin@admin.com', hashedPassword, 'admin']);
            }
        } catch (error) {
            console.log(error);
        }
    };

    getAllUsers = async () => {
        const result = await this.db.query(this.querys.security.getAllUsers);
        return result.rows;
    };

    getUser = async (params) => {
        const id = params[0].id;
        console.log(params[0].id);
        const result = await this.db.query(this.querys.security.getUser, [id]);
        return result.rows;
    };

    deleteUser = async (params) => {
        const id = params[0].id;
        const result = await this.db.query(this.querys.security.deleteUser, [id]);
        console.log(result);
        return result.rows;
    };

};

export default Security;