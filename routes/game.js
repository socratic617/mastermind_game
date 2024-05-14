const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createGame", ensureAuth, gameController.createGame);
router.put("/submit-game", ensureAuth, gameController.submitGame);

module.exports = router;
