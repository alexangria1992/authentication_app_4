import express from "express";
import colors from "colors";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(colors.cyan(`Server running on port ${port}`));
});
