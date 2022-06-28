const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

const POST_BATCH_SIZE = 4;

//CREATE POST
router.post("/", async (req, res) => {
  let isAdmin = false;
  const user = await User.findOne({ _id: req.user._id });
  if (user.group === "admin") {
    isAdmin = true;
    req.user.group = user.group;
    // console.log(user);
  }

  // console.log(isAdmin);
  const postData = { ...req.body };
  if (isAdmin) {
    postData.acceptedBy = req.body.userID;
    postData.reviewedAt = new Date();
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
  console.log(req.user);
  try {
    const post = await Post.findById(req.params.id);
    if (post.userID === req.user._id || req.user.group === "admin") {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.body._id,
          {
            $set: { title: req.body.title, text: req.body.text },
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
  // console.log(req.body);
  // res.status(200).json("res");
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.user);
    const post = await Post.findById(req.params.id);
    if (post.userID === req.user._id || req.user.group === "admin") {
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
  const page = req.query.page;
  const pending = req.query.pending;
  try {
    let posts;
    if (page) {
      posts = await Post.find({ acceptedBy: { $ne: null, $ne: "rejected" } })
        .skip(page * POST_BATCH_SIZE)
        .limit(POST_BATCH_SIZE)
        .sort({ reviewedAt: -1 });
    } else if (pending) {
      if (req.user && req.user.group === "admin") {
        posts = await Post.find({ acceptedBy: { $eq: null } }).sort({
          _id: -1,
        });
      } else {
        res
          .status(401)
          .json({ error: "You don't have permissions for this query" });
      }
    }

    // console.log(req.user);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// APPROVE POST
router.post("/approve/:id", async (req, res) => {
  try {
    if (req.user && req.user.group === "admin") {
      try {
        await Post.findByIdAndUpdate(req.params.id, {
          $set: { acceptedBy: req.user._id, reviewedAt: new Date() },
        });
        res.status(200).json("Post has been approved");
      } catch (err) {}
    } else {
      res.status(401).json("You don't have permission!");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  // console.log(req.body);
  // res.status(200).json("res");
});

// REJECT POST
router.post("/reject/:id", async (req, res) => {
  try {
    if (req.user && req.user.group === "admin") {
      try {
        await Post.findByIdAndUpdate(req.params.id, {
          $set: { acceptedBy: "rejected", reviewedAt: new Date() },
        });
        res.status(200).json("Post has been rejected");
      } catch (err) {}
    } else {
      res.status(401).json("You can update your posts only!");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  // console.log(req.body);
  // res.status(200).json("res");
});

module.exports = router;
