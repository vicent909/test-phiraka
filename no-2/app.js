const express = require("express");
const app = express();
const port = 3000;
const db = require("./db/databse");
const Controller = require("./controllers/user");
const database = new db();

database.connect();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!aa");
});

app.get("/login", Controller.login);
app.post("/login", Controller.postLogin);
app.get("/getuser", Controller.getUser);
app.get("/getAddUser", Controller.getAddUser);
app.post("/postAddUser", Controller.postAddUser);
app.get("/getEditUser/:id", Controller.getEditUser);
app.post("/postEditUser/:id", Controller.postEditUser);
app.get("/deleteUser/:id", Controller.deleteUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
