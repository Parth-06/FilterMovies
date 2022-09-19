const dotenv = require("dotenv");
const express = require("express");
const app = express();

const cors = require("cors");

dotenv.config({ path: "./config.env" });
require("./DB/conn");

app.use(express.json());
app.use(cors());

app.use(require("./router/auth"));
app.use(require("./router/LoginRegiAuth"));
app.use(require("./router/addListAuth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listning At ${PORT}`);
});
