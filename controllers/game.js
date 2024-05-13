module.exports = {
  getGame: (req, res) => {
    console.log("Im in the game controller!")
    res.render("index.ejs", {user: req.user });
  },
};
