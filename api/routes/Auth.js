const router = require("express").Router();
const User = require("../models/User");
const user = require("../models/User");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // console.log(payload)
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
}

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong credentials");
      return;
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(400).json("Wrong credentials");
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GOOGLE AUTH
router.post("/google", async (req, res) => {
  try {
    // console.log(req.body);
    try {
      const payload = await verify(req.body.credential);
      console.log("CORRECT");

      const user = await User.findOne({ email: payload.email });
      if (!user) {
        const newUser = new User({
          name: payload.name,
          email: payload.email,
          profile_pic: payload.picture,
          googleCred: req.body.credential,
        });
        const savedUser = await newUser.save();
        res.status(200).json(newUser);
        console.log("Creating a new user");
      } else {
        const updateResult = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $set: {
              googleCred: req.body.credential,
              name: payload.name,
              email: payload.email,
              profile_pic: payload.picture,
            },
          }
        );
        res.status(200).json(updateResult);
        console.log("Updating existing user values");
      }
      // console.log(payload);
    } catch (error) {
      console.log(e);
      res.status(400).json("Invalid credentials");
    }

    // const ticket = await client.verifyIdToken({
    //   idToken: req.body.credential + "SDSD",
    //   audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    // });
    // const payload = ticket.getPayload();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
