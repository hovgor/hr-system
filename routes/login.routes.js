const Router = require("express");
const router = new Router();
const authController = require("../controller/auth.controller");
const { validateSchema } = require("../middlewares/validateSchema");
const createPasswordSchema = require("../controller/createPasswordSchema");

router.post("/", authController.login);
router.post(
  "/insert_password",
  validateSchema(createPasswordSchema),
  authController.insertPassword
);
module.exports = router;
