const express = require('express');
const path = require("path");
const morgan = require('morgan');



const app = express();
const port = 3100;

// app.use("/public",express.static("public"));



app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'));
// console.log(__dirname);
require("./middlewares/view.mdw")(app);
require("./middlewares/routes.mdw")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})