const db = require("./databse");
const database = new db();

database.connect();
database.migration();