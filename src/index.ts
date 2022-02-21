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

//// GAMES/

app.get("/allGames", (request, response) => {
  apiCall("http://videogame-api.fly.dev/games", (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPages.push(i);
    }
    const datagames = data.games;

    response.render("allGames", { numberOfPages, datagames });
  });
});

///GAMES/PAGE

app.get("/allGames/:item", (request, response) => {
  const routeParameters = request.params;
  const page = routeParameters.item;
  const indexPage = parseInt(page);

  apiCall(`http://videogame-api.fly.dev/games?page=${indexPage}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPages.push(i);
    }
    const datagames = data.games;

    response.render("allGames", { numberOfPages, datagames, indexPage });
  });
});

//GAMES/GAME

///////////////////////////////////////////////
app.get("/allGames/:itemid/:itemname", (request, response) => {
  const routeParameters = request.params;
  const idgame = routeParameters.itemname;

  apiCall(`http://videogame-api.fly.dev/games/${idgame}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberofPages = [];
    for (let i = 0; i < data.total / 20 + 1; i++) {
      numberofPages.push(i);
    }

    response.render("allGamesgame", {
      gameinfo: data,
      gamegenres: data.genres,
      gamescreenshots: data.screenshots,
    });
  });
});

///PLATEFORMS

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

    response.redirect("plateforms/1");
  });
});

///PLATEFORMS/PAGE

///////////////////////////////////////////////
app.get("/plateforms/:item", (request, response) => {
  const routeParameters = request.params;
  const page = routeParameters.item;
  const indexPage = parseInt(page);
  apiCall(`http://videogame-api.fly.dev/platforms?page=${indexPage}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);
    const numberOfPages = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPages.push(i);
    }

    response.render("plateform", {
      numberOfPages,
      platforminfo: data,
      platform: data.platforms,
      indexPage,
    });
  });
});

/// PLATEFORM/GAMES/

///////////////////////////////////////////////
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

///PLATEFORMS/GAMES/NomDeLaPlateForm/ListeJeux/Page

///////////////////////////////////////////////
app.get("/Games/:itemname/:itemid/:item", (request, response) => {
  const routeParameters = request.params;
  const idname = routeParameters.itemname;
  const idplateform = routeParameters.itemid;
  const page = routeParameters.item;
  const indexPage = parseInt(page);

  apiCall(`http://videogame-api.fly.dev/games/platforms/${idplateform}?page=${indexPage}`, (error, body) => {
    if (error) {
      throw error;
    }
    const data = JSON.parse(body);

    const numberOfPagess = [];
    for (let i = 1; i < data.total / 20 + 1; i++) {
      numberOfPagess.push(i);
    }

    response.render("games", { numberOfPagess, id: idplateform, name: idname, listGame: data.games, indexPage });
  });
});

//// PLATEFORMS/GAMES/GAME

///////////////////////////////////////////////
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

///////////////////////////////////////////////
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
