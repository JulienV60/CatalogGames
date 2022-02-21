import express from "express";
import nunjucks from "nunjucks";
import fetch from "node-fetch";

////////////////////////////////////////////////////////
const app = express();
app.use(express.static("Public"));
nunjucks.configure("views", { autoescape: true, express: app });
app.set("view engine", "njk");
////////////////////////////////////////////////////////////////////////
///VARIABLES PAGES

///HOME
////////////////////////////////////////////////

app.get("/", (request, response) => {
  response.render("home");
});

//// GAMES/

app.get("/allGames", (request, response) => {
  fetch("http://videogame-api.fly.dev/games")
    .then((text) => text.json())
    .then((data) => {
      const allGames = data.games;
      const allPage = data.total;
      const numberOfPages = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
        numberOfPages.push(i);
      }
      response.render("allGames", { numberOfPages, allGames });
    });
});

///GAMES/PAGE

app.get("/allGames/:item", (request, response) => {
  const routeParameters = request.params;
  const page = routeParameters.item;
  const indexPage = parseInt(page);

  fetch(`http://videogame-api.fly.dev/games?page=${indexPage}`)
    .then((text) => text.json())
    .then((data) => {
      const allGames = data.games;
      const allPage = data.total;
      const numberOfPages = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
        numberOfPages.push(i);
      }
      response.render("allGames", { numberOfPages, allGames, indexPage });
    });
});

//GAMES/GAME

///////////////////////////////////////////////
app.get("/allGames/:itemid/:itemname", (request, response) => {
  const routeParameters = request.params;
  const idgame = routeParameters.itemname;

  fetch(`http://videogame-api.fly.dev/games/${idgame}`)
    .then((text) => text.json())
    .then((data) => {
      const gameinfo = data;
      const gamegenres = data.genres;
      const gamescreenshots = data.screenshots;
      response.render("allGamesgame", {
        gameinfo,
        gamegenres,
        gamescreenshots,
      });
    });
});

///PLATEFORMS

///////////////////////////////////////////////
app.get("/plateforms", (request, response) => {
  fetch("http://videogame-api.fly.dev/platforms")
    .then((text) => text.json())
    .then((data) => {
      const allPage = data.total;
      const numberOfPages = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
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
  fetch(`http://videogame-api.fly.dev/platforms?page=${indexPage}`)
    .then((text) => text.json())
    .then((data) => {
      const platforminfo = data;
      const allPage = data.total;
      const numberOfPages = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
        numberOfPages.push(i);
      }
      const platform = data.platforms;
      response.render("plateform", {
        numberOfPages,
        platforminfo,
        platform,
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

  fetch(`http://videogame-api.fly.dev/games/platforms/${idplateform}`)
    .then((text) => text.json())
    .then((data) => {
      const allPage = data.total;
      const numberOfPagess = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
        numberOfPagess.push(i);
      }
      const listGame = data.games;
      response.render("games", { numberOfPagess, id: idplateform, name: idname, listGame });
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

  fetch(`http://videogame-api.fly.dev/games/platforms/${idplateform}?page=${indexPage}`)
    .then((text) => text.json())
    .then((data) => {
      const allPage = data.total;
      const numberOfPagess = [];
      for (let i = 1; i < allPage / 20 + 1; i++) {
        numberOfPagess.push(i);
      }
      const listGame = data.games;
      response.render("games", { numberOfPagess, id: idplateform, name: idname, listGame, indexPage });
    });
});

//// PLATEFORMS/GAMES/GAME

///////////////////////////////////////////////
app.get("/Game/:itemid/:itemname", (request, response) => {
  const routeParameters = request.params;
  const idgame = routeParameters.itemid;

  fetch(`http://videogame-api.fly.dev/games/${idgame}`)
    .then((text) => text.json())
    .then((data) => {
      const gameinfo = data;
      const gamegenres = data.genres;
      const gamescreenshots = data.screenshots;
      response.render("game", {
        gameinfo,
        gamegenres,
        gamescreenshots,
      });
    });
});

/// LANCEMENT SERVEUR

///////////////////////////////////////////////
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
