const knex = require("../db/db");
const sha1 = require("sha1");
const mailer = require("../function-email/fooMailer");

//error controller

class HttpException extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

//error controller^^^^^^^

class userController {
  async createUser(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        email,
        work_email,
        position,
        date_of_birth,
        phone,
        social_card_no,
      } = req.body;

      const inserted = await knex("user")
        .insert({
          first_name,
          last_name,
          email,
          work_email,
          position,
          date_of_birth,
          phone,
          social_card_no,
          hashingVerify: sha1(work_email),
        })
        .returning("*");
      mailer(work_email);
      res.json({
        data: inserted,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
  async getUserPage(req, res) {
    try {
      const user = await knex.select(rows).table("user");
      res.json(user.rows);
    } catch (error) {
      console.log(error);

      res.status(400).send(error.message);
    }
  }

  //get Users

  async getUsers(req, res) {
    try {
      const users = await knex("user").select("*");
      console.log(users);
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  //get one user

  async getOneUser(req, res) {
    try {
      const id = req.body;
      const users = await knex("user").select("*");
      for (let i = 0; i < users.length; ++i) {
        if (users[i].id === id.id) {
          res.json(users[i]);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  // update user

  async updateUser(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        work_email,
        position,
        date_of_birth,
        phone,
        social_card_no,
      } = req.body;
      const inserted = await knex("user")
        .update({
          first_name,
          last_name,
          email,
          work_email,
          position,
          date_of_birth,
          phone,
          social_card_no,
        })
        .returning("*");

      res.json({
        data: inserted,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
  // delete user

  async deleteUser(req, res) {
    try {
      const { work_email } = req.body;

      const query = await knex("user").del().where({
        work_email: work_email,
      });
      if (!query) {
        throw new HttpException(404, `User wasn't found`);
      }

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(error.status).send(error.message);
    }
  }
}

module.exports = new userController();
