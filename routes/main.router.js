const { Router } = require("express");
const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const loginRouter = require("./login.routes");

const router = new Router();
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/auth", loginRouter);

module.exports = router;
