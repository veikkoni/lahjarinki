const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const JsonDB = require("node-json-db").JsonDB;
const Config = require("node-json-db/dist/lib/JsonDBConfig").Config;

const config = require("./config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var db = new JsonDB(new Config("./data/data", true, true, "/"));

app.post("/api/join", (req, res, next) => {
  console.log("Request to post login");
  if (req.body.name && req.body.participating && req.body.circle) {
    console.log(req.body.name);
    db.push("/wishes[]", {
      name: req.body.name,
      wish: req.body.wish,
      unwish: req.body.unwish,
      participating: req.body.participating,
      circle: req.body.circle,
      datetime: new Date(),
    });

    res.json({ status: "ok" });
    console.log("ok");
  } else {
    res.json({ status: "error" });
    console.log("error");
  }
});

app.get("/api/results/:id", async (req, res, next) => {
  console.log("Request to get results");
  if (req.params.id) {
    console.log(req.params.id);
    const results = await db.getData("/results");
    const result = results.find((i) => i.identifier == req.params.id);
    res.json(result || {});
    console.log("ok");
  } else {
    res.json({ status: "false" });
    console.log("error");
  }
});

app.get(
  "/api/addResult/:identifier/:name/:target/:password",
  async (req, res, next) => {
    console.log("Request to add result");
    if (req.params.password == config.addResultPassword) {
      const wishes = await db.getData("/wishes/");

      const wish = wishes
        .sort((x, y) => {
          return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1;
        })
        .find((i) => req.params.target.toLowerCase() == i.name.toLowerCase());

      if (wish) {
        db.push("/results[]", {
          identifier: req.params.identifier,
          name: req.params.name,
          target: wish.name,
          wish: wish.wish,
          unwish: wish.unwish,
          datetime: new Date(),
        });

        res.json({ status: "ok" });
        console.log("ok");
      } else {
        res.json({ status: "error" });
        console.log("error");
      }
    } else {
      res.json({ status: "auth error" });
      console.log("auth error");
    }
  }
);

app.listen(config.port, () => {
  console.log("Server running");
});
