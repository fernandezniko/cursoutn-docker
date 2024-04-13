const express = require("express");
const db = require("./persistance");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(require("body-parser").json());
app.use(express.static(__dirname + "/static"));

app.get("/api/test", async (req, res) => {
  const result = await db.test();
  const date = result[0]["NOW()"];
  res.send(date);
});

app.get("/api/facts", async (req, res) => {
  const facts = await db.getFacts();
  res.send(facts);
});

app.post("/api/facts", async (req, res) => {
  const itemFact = {
    id: uuidv4(),
    description: req.body.description,
  };
  await db.storeFact(itemFact);
  res.send(itemFact);
});

app.delete("/api/fact/:id", async (req, res) => {
  await db.removeFact(req.params.id);
  res.sendStatus(200);
});

db.init()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
