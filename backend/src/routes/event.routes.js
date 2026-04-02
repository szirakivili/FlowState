const router = require("express").Router();
const ctrl = require("../controllers/event.controller");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/", ctrl.getAllEvents);
router.get("/:id", ctrl.getEvent);
router.post("/", ctrl.createEvent);
router.put("/:id", ctrl.updateEvent);
router.delete("/:id", ctrl.deleteEvent);

module.exports = router;
