const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const gameController = require("../controllers/game");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/game-config", ensureAuth, gameController.getGameConfig);
router.get("/", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


module.exports = router;
