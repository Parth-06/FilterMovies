const express = require("express");
const router = express.Router();
require("../DB/conn");
const authenticate = require("../Middleware/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const Pusher = require("pusher");
const mongoose = require("mongoose");

const pusher = new Pusher({
  appId: "1479272",
  key: "297ca2b606606f6b9311",
  secret: "25ec650066747029ca2c",
  cluster: "ap2",
  useTLS: true,
});

const dbn = mongoose.connection;
dbn.once("open", () => {
  const msgCollection = dbn.collection("registers");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "update") {
      const cartdel = change.fullDocument;
      pusher.trigger("updatesomthing", "updated", {
        _id: cartdel,
      });
    } else {
      console.log("Error Pushing");
    }
  });
});
router.get("/home", authenticate, async (req, res) => {
  return res.json(req.rootUser);
});

module.exports = router;
