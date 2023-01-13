const express = require("express");
const SECRET = process.env.SECRET_JWT;
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const port = process.env.PORT || 3000;
//Inportant env for deploy in fly
/*
app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>A ver si jala esta wea!</h1>";
  const name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});*/

app.get("/secret", (req, res) => {
  res.json({ name: `${SECRET}`})

})

app.get("/ping", async (req, res) => {
  await client.connect();
  const result = await client.query("SELECT $1::text as message", [
    "Hello world",
  ]);
  console.log(result.rows[0].message);
  await client.end();
  res.json(result.rows[0]);
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
