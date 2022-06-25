const router = require("express").Router();

const passport = require("passport");
const clientURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_CLIENT_URL_PROD
    : process.env.REACT_APP_CLIENT_URL_DEV;

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
    successRedirect: clientURL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(clientURL);
  // req.session.destroy(() => {
  //   res.clearCookie("connect.sid");
  //   res.redirect("/");
  // });
});

module.exports = router;
