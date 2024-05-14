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

      const game = await Game.create({
        'player-mode': req.body['player-mode'],
        'rounds-input': req.body['rounds-input'],
        'guesses-input': req.body['guesses-input'],
        'max-range': req.body['max-range'],
        'max-columns': req.body['max-columns'],
        'max-time': req.body['rounds-input'],
        user: req.user._id,
        'user-name': req.user.userName,
      });

      res.render("game.ejs", {game: game, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  submitGame: async (req, res) => {
    try {
      console.log("Im inside Submit Game function : ")
      console.log("req.body : ", req.body)
      const game = await Game.findOneAndUpdate(
        { _id: req.body.gameId },
        { score: req.body.score}
      )

      // return res.redirect(303,"/game/leadership-board")
      return res.send('Score was submitted!')
    } catch (err) {
      console.log(err);
    }
  }
};
