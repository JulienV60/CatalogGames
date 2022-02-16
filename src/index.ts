import express from "express";
import nunjucks from "nunjucks";
import apiCall from "@fewlines-education/request";
const app = express();
app.use(express.static("Public"));
nunjucks.configure("views", { autoescape: true, express: app });
app.set("view engine", "njk");

app.get("/", (request, response) => {
  apiCall("http://videogame-api.fly.dev/games", (error, body) => {
    if (error) {
      throw error;
    }
    const joke = JSON.parse(body);
    console.log(joke);
    response.render("home");
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
