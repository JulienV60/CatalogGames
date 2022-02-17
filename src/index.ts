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
/// GAMES/
app.get("/Games/:itemname/:itemid/", (request, response) => {
  const routeParameters = request.params;
  const idplateform = routeParameters.itemid;
  const idname = routeParameters.itemname;

  apiCall(`http://videogame-api.fly.dev/games/platforms/${idplateform}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPagess = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPagess.push(i);
    }

    response.render("games", { numberOfPagess, id: idplateform, name: idname, listGame: data.games });
  });
});

///GAMES/NomDeLaPlateForm/ListeJeux/Page

app.get("/Games/:itemname/:itemid/:item", (request, response) => {
  const routeParameters = request.params;
  const idname = routeParameters.itemname;
  const idplateform = routeParameters.itemid;
  const page = routeParameters.item;

  apiCall(`http://videogame-api.fly.dev/games/platforms/${idplateform}?page=${page}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    const numberOfPagess = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPagess.push(i);
    }

    response.render("games", { numberOfPagess, id: idplateform, name: idname, listGame: data.games });
  });
});
//// GAMES/GAME
app.get("/Game/:itemid/:itemname", (request, response) => {
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
      gameinfo: data,
      gamegenres: data.genres,
      gamescreenshots: data.screenshots,
    });
  });
});
/// LANCEMENT SERVEUR
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
