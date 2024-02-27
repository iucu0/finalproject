const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const providers = require("./data/providers");

app.use(cors());
app.use(express.json());

app.use("/providers", providers);
app.use("/*", (req, res) => {
  res.status(404).json({
    message: "Incorrect route or params",
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
