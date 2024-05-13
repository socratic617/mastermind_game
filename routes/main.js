const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const gameController = require("../controllers/game");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/game-config", ensureAuth, gameController.getGameConfig);// Modal (endpoint, callback function)
router.get("/", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


module.exports = router;
