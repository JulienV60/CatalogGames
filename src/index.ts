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

    response.render("plateform", { platforminfo: data, platform: data.platforms });
  });
});
app.get("/Games/:itemname/:itemid", (request, response) => {
  const routeParameters = request.params;
  const idplateform = routeParameters.itemid;
  const idname = routeParameters.itemname;

  apiCall(`http://videogame-api.fly.dev/games/platforms/${idplateform}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    response.render("games", { nameid: idname, listGame: data.games });
  });
});

app.get("/Games/game/:itemname/:itemid", (request, response) => {
  const routeParameters = request.params;
  const idgame = routeParameters.itemid;

  apiCall(`http://videogame-api.fly.dev/games/${idgame}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    response.render("game", { gameinfo: data, gamegenres: data.genres, gamescreenshots: data.screenshots });
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
