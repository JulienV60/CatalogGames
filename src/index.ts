import express from "express";
import nunjucks from "nunjucks";
import apiCall from "@fewlines-education/request";

const app = express();
app.use(express.static("Public"));
nunjucks.configure("views", { autoescape: true, express: app });
app.set("view engine", "njk");

app.get("/", (request, response) => {
  apiCall("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    response.render("home", { platform: data.platforms });
  });
});
app.get("/Games/:itemid", (request, response) => {
  const routeParameters = request.params;
  const id = routeParameters.itemid;

  apiCall(`http://videogame-api.fly.dev/games/platforms/${id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    response.render("games", { listGame: data.games });
  });
});
app.get("/Games/game/:itemid", (request, response) => {
  const routeParameters = request.params;
  const id = routeParameters.itemid;

  apiCall(`http://videogame-api.fly.dev/games/${id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    response.render("descriptiongame", { game: data.screenshots });
  });
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
