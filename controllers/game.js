const Game = require("../models/Game");

module.exports = {
  getGameConfig: async (req, res) => {
    try {
      console.log(" getGameConfig: Im in the game controller!")
      console.log("req.body : ", req.body)
      console.log("req.user : ", req.user)
      res.render("index.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createGame: async (req, res) => {
    try {
      console.log("Im inside Create Game function : ")
      console.log("req.body : ", req.body)
      console.log("req.user : ", req.user)

      const game = await Game.create({
        'player-mode': req.body['player-mode'],
        'rounds-input': req.body['rounds-input'],
        'guesses-input': req.body['guesses-input'],
        'max-range': req.body['max-range'],
        'max-columns': req.body['max-columns'],
        'max-time': req.body['rounds-input'],
        user: req.user._id,
      });
      // 'player-one-score': req.body['player-one-score'],
      // 'player-two-score': req.body['player-two-score'],
      // winner: req.body.winner,
      console.log("Game has been created!");
      console.log("Game : ", game);
      res.render("game.ejs", {game: game, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getGame: async (req, res) => {
    try {
      console.log("Im inside Get Game function : ")
      console.log("req.body : ", req.body)
    } catch (err) {
      console.log(err);
    }
  },
};
