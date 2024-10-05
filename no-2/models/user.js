const pool = require("../db/pool");
const { comparePassword } = require("../helpers/bcrypt");
const Factory = require("./class");

class models {
  static async getUser(username, password) {
    if (!username || !password) {
      //   return "Please enter username and password";
      throw { msg: "Please enter username and password" };
    }
    const { rows } = await pool.query(`select * 
from "tbl_user"
where username = '${username}'`);
    if (rows.length === 0) {
      throw { msg: "user not found" };
    }
    const compare = await comparePassword(password, rows[0].password)
    
    if (!compare) {
      throw { msg: "invalid password" };
    }

    return "ok";
  }

  static async getAllUser() {
    const { rows } = await pool.query(`select * 
        from "tbl_user"`);

    const instanceData = Factory.createUser(rows);
    return instanceData;
  }

  static async getUserById(id) {
    const { rows } = await pool.query(`select * 
        from "tbl_user"
        where id = '${id}'`);
    const instanceData = Factory.createUser(rows);
    return instanceData;
  }

  static async postUser(username, password) {
    const data =
      await pool.query(`insert into "tbl_user" (username, "password") values('${username}', '${password}')
`);
    return "ok";
  }

  static async postEditUser(id, username, password) {
    const data = await pool.query(`update "tbl_user" 
        set "username" = '${username}',
        "password" = '${password}'
        where id = '${id}'
`);
  }

  static async deleteUser(id) {
    const data = await pool.query(`delete from "tbl_user" where id = '${id}'`);
  }
}

module.exports = models;
