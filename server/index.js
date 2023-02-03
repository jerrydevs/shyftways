const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", api);

const port = 8080;
app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Listening: http://localhost:${port}`);
});
