const knex = require("../db/db");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const { secret } = require("../config");

const generateAccsessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class loginController {
  async login(req, res) {
    try {
      const { work_email, password } = req.body;

      const hashPassword = sha1(password);
      const user = await knex("user")
        .select()
        .where({
          work_email: work_email,
          password: hashPassword,
        })
        .first();
      const roles = await knex("role")
        .select([`role.code`])
        .leftJoin("rel", "rel.role_id", "role.id")
        .where("rel.user_id", user.id);

      if (!user) {
        return res.status(400).json({
          message: "Wrong login or password",
        });
      }

      //token acsses
      const token = generateAccsessToken();

      res.status(200).json({
        data: {
          token,
        },
        message: "OK",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }
  async insertPassword(req, res) {
    try {
      const { email, password, retPassword } = req.body;
      if (password !== retPassword) {
        return res.status(402).json({
          message: "Password mismatch!",
        });
      }
      const hashPassword = sha1(password);
      const user = await knex("user")
        .where({
          work_email: email,
        })
        .update({
          password: hashPassword,
        });
      if (!user) {
        return res.status(401).json({
          message: "User is not found",
        });
      }
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(401).send(error.message);
    }
  }
}

module.exports = new loginController();
