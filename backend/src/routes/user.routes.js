const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const { protect, restrictTo } = require("../middleware/auth");

router.use(protect);
router.get("/", restrictTo("admin"), ctrl.getAllUsers);
router.get("/:id", restrictTo("admin"), ctrl.getUser);
router.put("/:id", restrictTo("admin"), ctrl.updateUser);
router.delete("/:id", restrictTo("admin"), ctrl.deleteUser);

module.exports = router;
