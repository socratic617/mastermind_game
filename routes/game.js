const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createGame", ensureAuth, gameController.createGame);//update DB w/ new game 
// router.get("/newGame", ensureAuth, gameController.getGame);//DecoderBoard getting new game from DB
router.put("/submit-game", ensureAuth, gameController.submitGame)
router.get("/leadership-board", ensureAuth, gameController.getLeadershipBoard);
module.exports = router;
