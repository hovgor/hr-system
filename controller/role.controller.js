const knex = require("../db/db");
class roleController {
  async createRole(req, res, next) {
    try {
      const { code, description } = req.body;
      await knex("role").insert({
        code: code,
        description: description,
      });
    } catch (error) {
      console.log(error);
      res.status(401).send(error.message);
    }
  }
  async updateRole(req, res) {
    try {
      const role = ({ position } = req.body);
      await knex("role")
        .update({
          position,
        })
        .returning("*");
      res.json(role);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
  async getRole(req, res) {
    try {
      const role = await db.query("SELECT * FROM role");
      res.json(role.rows);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  async getOneRole(req, res) {
    try {
      const id = req.params.id;
      const role = await knex.select(id).from("role");
      res.json(role.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  async deleteRole(req, res) {
    try {
      await knex("role").del().where({
        id: req.body.role_id,
      });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
}

module.exports = new roleController();
