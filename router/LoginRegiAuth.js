const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/register", async (req, res) => {
  const { Name, email, password } = req.body;

  if (!email || !password || !Name) {
    return res.status(401).json({ error: "Error fill please" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else {
      const user1 = new User({
        Name,
        email,
        password,
        movieID: [],
        User: "User1",
        img_path:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
      });
      await user1.save();
      const user2 = new User({
        Name: "User2",
        email,
        password,
        movieID: [],
        User: "User2",
        img_path:
          "https://i.pinimg.com/474x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg",
      });
      await user2.save();
      const user3 = new User({
        Name: "User3",
        email,
        password,
        movieID: [],
        User: "User3",
        img_path:
          "https://i.pinimg.com/474x/bd/ee/4c/bdee4c328550aaf21aa9f43fd19e2136.jpg",
      });
      await user3.save();
      const user4 = new User({
        Name: "User4",
        email,
        password,
        movieID: [],
        User: "User4",
        img_path:
          "https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png",
      });
      await user4.save();
      res.status(210).json({ message: "Registration Success" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  router.use(cookieParser());
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Error fill please" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        // token = await userLogin.genrateAuthToken();
        // res.cookie("jwtoken", token, {
        //   expires: new Date(Date.now() + 25892000000),
        //   httpOnly: true,
        // });

        return res.json({ message: "Login success" });
      } else {
        return res.status(400).json({ error: "Invalid Credencials password" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credencials email" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/profilelogin", async (req, res) => {
  router.use(cookieParser());
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ error: "Error fill please" });
    }
    // const userLogin = await User.findOne({ User: username });
    const listOne = await User.findOne({
      $and: [{ email: email }, { User: username }],
    });
    if (listOne) {
      token = await listOne.genrateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      return res.json({ message: "Login success", token });
    } else {
      return res.status(400).json({ error: "Invalid Credencials email" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  return res.json(token);
});

router.get("/logout", async (req, res) => {
  res.clearCookie("jwtoken", { httpOnly: true });

  res.status(200).send({ message: "logout success" });
});

module.exports = router;
