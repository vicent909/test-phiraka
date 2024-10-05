const { Client } = require("pg");

class db {
  constructor() {
    this.db = new Client({
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5432,
      database: "phirakaTest",
      idleTimeoutMillis: 100,
    });
  }

  async connect() {
    try {
      await this.db.connect();
      console.log("Connected");
    } catch (error) {
      console.log("Connection failed", error);
    }
  }

  async migration() {
    const createTable = `create table if not exists "tbl_user"(
        "id" SERIAL primary key,
        "username" VARCHAR(128) NOT NULL,
        "password" varchar(128) NOT NULL,
        "createdTime" DATE NOT NULL DEFAULT CURRENT_DATE
    );`;

    this.db
      .query(createTable)
      .then((res) => {
        console.log("migration success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = db;
