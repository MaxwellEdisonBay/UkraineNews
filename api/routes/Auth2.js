const router = require("express").Router();

const passport = require("passport");
// const CLIENT_URL = "http://localhost:3000";
const CLIENT_URL = "https://ukrajinazije.cz";

router.get("/login/success", (req, res) => {
  console.log("LOGIN-SUCCESS");
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      // cookies: req.cookies
    });
    console.log(req.user);
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
  // req.session.destroy(() => {
  //   res.clearCookie("connect.sid");
  //   res.redirect("/");
  // });
});

module.exports = router;
