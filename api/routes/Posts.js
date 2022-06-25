const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//CREATE POST
router.post("/", async (req, res) => {
  let isAdmin = false;
  const user = await User.findOne({ _id: req.user._id });
  if (user.group === "admin") {
    isAdmin = true;
    req.user.group = user.group;
    console.log(user);
  }

  console.log(isAdmin);
  const postData = { ...req.body };
  if (isAdmin) {
    postData.acceptedBy = req.body.userID;
  }
  const newPost = new Post(postData);
  // console.log(newPost);
  try {
    await newPost.save((error, result) => {
      if (!error) {
        res.status(200).json(result);
        console.log(result);
      } else {
        console.log(error);
      }
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {}
    } else {
      res.status(401).json("You can update your posts only!");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {}
    } else {
      res.status(401).json("You can delete your posts only!");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ _id: -1 });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find({ acceptedBy: { $ne: "" } }).sort({ _id: -1 });
    }
    // console.log(req.user);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
