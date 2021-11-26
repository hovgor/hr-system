const Router = require("express");

const router = new Router();

const userController = require("../controller/user.controller");

const { validateSchema } = require("../middlewares/validateSchema");

const creatUserSchema = require("../controller/createUserSchema");

// creat user
router.post("/", validateSchema(creatUserSchema), userController.createUser);

// get all user
router.get("/", userController.getUsers);

// get one user
router.get("/id", userController.getOneUser);

// update user
router.put("/", userController.updateUser);

// delete user
router.delete("/", userController.deleteUser);

module.exports = router;
