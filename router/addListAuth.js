const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const authenticate = require("../Middleware/Authenticate");

router.post("/add_id", authenticate, async (req, res) => {
  const { id } = req.body;
  const userExist = await User.findOne({ _id: req.userID });
  const buf = Buffer.from(userExist.uniqueID);

  try {
    if (!buf.includes(id.id)) {
      const userNew = await User.updateOne(
        { _id: req.userID },
        {
          $push: {
            movieID: id,
          },
        }
      );
      const addid = await User.updateOne(
        { _id: req.userID },
        {
          $push: {
            uniqueID: id.id,
          },
        }
      );
      res.status(210).json({ message: "Success" });
    } else {
      console.log("Duplicate");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/updatename", async (req, res) => {
  const { email, updatedname, username } = req.body;

  try {
    const userNew = await User.updateOne(
      { email: email, User: username },
      {
        Name: updatedname,
      }
    );
    res.status(210).json({ message: " Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/alluser", async (req, res) => {
  const { email } = req.body;

  const userExist = await User.find({ email: email });
  if (userExist) {
    return res.json(userExist);
  }
});

router.get("/allusernav", async (req, res) => {
  const userExist = await User.find({ email: req.rootUser.email });
  if (userExist) {
    return res.json(userExist);
  }
});

router.post("/remove_id", authenticate, async (req, res) => {
  const { id } = req.body;
  try {
    const userNew = await User.updateOne(
      { _id: req.userID },
      {
        $pull: {
          movieID: id,
        },
      }
    );
    const removeid = await User.updateOne(
      { _id: req.userID },
      {
        $pull: {
          uniqueID: id.id,
        },
      }
    );
    res.status(210).json({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_movie", authenticate, async (req, res) => {
  const userpro = await User.findOne({ _id: req.userID });

  if (userpro) {
    try {
      return res.json(userpro.movieID);
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/get_uniqueid", authenticate, async (req, res) => {
  const userpro = await User.findOne({ _id: req.userID });

  if (userpro) {
    try {
      return res.json(userpro.uniqueID);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
