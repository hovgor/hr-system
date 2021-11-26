// require("dotenv").config();
const express = require("express");

const router = require("./routes/main.router");
const cors = require("cors");

const PORT = process.env.PORT || 3014;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
