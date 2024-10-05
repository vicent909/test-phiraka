const db = require("../db/databse");
const { hashPassword } = require("../helpers/bcrypt");
const models = require("../models/user");
const database = new db();

class Controller {
  static async login(req, res) {
    const err = req.query.errors;
    try {
      res.render("LoginPage", { err });
    } catch (error) {
      res.send(error);
    }
  }
  static async postLogin(req, res) {
    const { username, password } = req.body;

    try {
      if (!req.body["g-recaptcha-response"]) {
        throw { msg: "Plese verify you're not a robot" };
      }
      const data = await models.getUser(username, password);
      res.redirect("/getUser");
    } catch (error) {
      res.redirect(`/login?errors=${error.msg}`);
    }
  }

  static async getUser(req, res) {
    try {
      const data = await models.getAllUser();

      res.render("GetUserPage", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddUser(req, res) {
    const err = req.query.errors;
    try {
      res.render("AddUserPage", { err });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddUser(req, res) {
    const { username, password } = req.body;
    try {
      if (password.length < 5 || password.length > 8) {
        throw { msg: "password must more than 5 and less than 8" }
      }
      const hashed = hashPassword(password);
      const data = await models.postUser(username, hashed);
      res.redirect("/getUser");
    } catch (error) {
      res.redirect(`/getAddUser?errors=${error.msg}`);
    //   res.send(error);
    }
  }

  static async getEditUser(req, res) {
    const { id } = req.params;
    try {
      const data = await models.getUserById(id);
      res.render("EditUserPage", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditUser(req, res) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const data = await models.postEditUser(id, username, password);
      res.redirect("/getUser");
    } catch (error) {
      res.send(error);
    //   console.log(error);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const data = await models.deleteUser(id);
      res.redirect("/getUser");
    } catch (error) {
      res.send(error);
    //   console.log(error);
    }
  }
}

module.exports = Controller;
