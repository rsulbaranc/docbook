import  {pool}  from "../../db.js";
import bcrypt from "bcrypt";
import querys from "../../utils/querys.json" assert { type: "json" };

let Security = class {

    constructor() {
        this.db = pool;
        this.bycrypt = bcrypt;
        this.querys = querys;
    }

    init = async () => {
        try {
            const result = await this.db.query(this.querys.security.checkAdminExists);
            const adminExists = result.rows[0].count > 0;

            if (!adminExists) {
                const hashedPassword = await this.bycrypt.hash('admin123', 10);
                await this.db.query(this.querys.auth.register, ['administrador', 'admin@admin.com', hashedPassword, 'admin']);
                console.log("Admin user created");
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