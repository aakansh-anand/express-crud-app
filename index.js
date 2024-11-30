// Notes + Code

/* 
Start with installing npm packages but making a package.json file via `npm init`
Then you have to remove the test script and add a start script that runs the server
with node as production server with the first file, mine is index.js

Also change the type under "main": "index.js" in package.json, if type is not present
add it manually and set the type to "module", by doing this you can use import way of
ES6+

Now make a new file called index.js and import express, then make a variable to use the
powers of express. I chose to call it app, you can use whatever you want, and also give
a port number, I chose 3000, you can go with any available port, We've talked about 
ports before as well.
*/
import express from "express";
const app = express();
const port = 3000;
/* 
express can easily use the methods of requests (get, post, put, patch, delete etc.)
We're using get request to GET the request. It takes two parameters, the path of request
in our case we're using "/" as root path here
We're using res.send to send a response as text.
*/
// app.get("/", (req, res) => {
//   res.send("Orewa Monkey D Luffy.");
// });
/* 
Now we're applying the same concept but on different path way. "/zoro".
This goes on and on and we can make as many routes as we want.
*/
// app.get("/zoro", (req, res) => {
//   res.send("Roronoa Zoro");
// });

// app.get("/ussop", (req, res) => {
//   res.send("God Ussop");
// });

/* ************** couple of changes, trying a new way of doing things ******************* */
// server
app.use(express.json());
let onePiece = [];
let nextId = 1;

// Add New Character in One Piece
app.post("/character", (req, res) => {
  // We are destructing on the use, generally body is big object so we can use whatever we need.
  const { name, role } = req.body;
  const newChar = { id: nextId++, name, role };
  onePiece.push(newChar);
  res.status(201).send(newChar);
});

// displaying all the data via get request. and response.
app.get("/characters", (req, res) => {
  res.status(200).send(onePiece);
});

// Get single character using URL Params as ID
app.get("/characters/:id", (req, res) => {
  const character = onePiece.find(
    (char) => char.id === parseInt(req.params.id)
  );
  if (!character) {
    return res.status(404).send("Character Not Found");
  }
  res.status(200).send(character);
});

// Update the character with ID
app.put("/characters/:id", (req, res) => {
  const characterId = req.params.id;
  const character = onePiece.find((char) => char.id === parseInt(characterId));
  if (!character) return res.status(404).send("Character not found");
  const { name, role } = req.body;
  character.name = name;
  character.role = role;
  res.status(200).send(character);
});

// Delete if there are characters
app.delete("/characters/:id", (req, res) => {
  const charIndex = onePiece.findIndex(char => char.id === parseInt(req.params.id));
  if (charIndex === -1) {
    return res.status(404).send("Character not found");
  }
  onePiece.splice(charIndex, 1);
  return res.status(204).send("Deleted...");
});

/* 
Here we're make the express listen on the port we are passing as args here.
First goes port then goes a callback that decides what's gonna happen.
*/
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
