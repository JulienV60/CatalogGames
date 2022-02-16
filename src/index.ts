import express from "express";
import nunjucks from "nunjucks";
import apiCall from "@fewlines-education/request";
////////////////////////////////////////////////////////
const app = express();
app.use(express.static("Public"));
nunjucks.configure("views", { autoescape: true, express: app });
app.set("view engine", "njk");
////////////////////////////////////////////////////////////////////////

///HOME
////////////////////////////////////////////////
app.get("/", (request, response) => {
  response.render("home");
});

///Plateform
///////////////////////////////////////////////

app.get("/plateforms", (request, response) => {
  apiCall("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPages.push(i);
    }

    response.render("plateform", { numberOfPages, platforminfo: data, platform: data.platforms });
  });
});
///Plateforms/page
app.get("/plateforms/:item", (request, response) => {
  const routeParameters = request.params;
  const page = routeParameters.item;
  console.log(page);
  apiCall(`http://videogame-api.fly.dev/platforms?page=${page}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPages.push(i);
    }

    response.render("plateform", { numberOfPages, platforminfo: data, platform: data.platforms });
  });
});

app.get("/Games/:itemname/:itemid", (request, response) => {
  const routeParameters = request.params;
  const idplateform = routeParameters.itemid;
  const idname = routeParameters.itemname;

  apiCall(`http://videogame-api.fly.dev/games/platforms/${idplateform}?page=${page}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberofPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberofPages.push(i);
    }

    response.render("games", { numberofPages, nameid: idname, listGame: data.games });
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
    const numberofPages = [];
    for (let i = 0; i < data.total / 20 + 1; i++) {
      numberofPages.push(i);
    }
    response.render("game", {
      numberofPages,
      gameinfo: data,
      gamegenres: data.genres,
      gamescreenshots: data.screenshots,
    });
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
