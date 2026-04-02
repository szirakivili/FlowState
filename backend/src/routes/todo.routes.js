const router = require("express").Router();
const ctrl = require("../controllers/todo.controller");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/", ctrl.getAllTodos);
router.get("/:id", ctrl.getTodo);
router.post("/", ctrl.createTodo);
router.put("/:id", ctrl.updateTodo);
router.delete("/:id", ctrl.deleteTodo);

module.exports = router;
