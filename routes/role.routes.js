const Router = require("express");
const router = new Router();
const roleController = require("../controller/role.controller");

router.post("/", roleController.createRole);

router.get("/", roleController.getRole);
router.get("//:id", roleController.getOneRole);
router.put("/", roleController.updateRole);
router.delete("/", roleController.deleteRole);

module.exports = router;
