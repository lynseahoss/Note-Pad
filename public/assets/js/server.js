const express = require("express");
const app = express();
const PORT = 6312;


////Routes////
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "notes.html"));
//   });

app.use('/*', express.static(path.join(__dirname, 'index')))

app.use('/notes', express.static(path.join(__dirname, 'notes')))

  




  ///Listener///
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });