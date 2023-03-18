const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;
const intializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`Error due to ${error.message}`);
    process.exit(1);
  }
};
intializeDbServer();

//GETTING ALL MOVIE NAMES API
app.get("/movies/", async (request, response) => {
  const allMovieNames = `SELECT movie_name FROM MOVIE`;
  const dbResponse = await db.all(allMovieNames);
  response.send(dbResponse);
});

// ADDING A MOVIE API
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const updateMovie = `INSERT INTO MOVIE (director_id,movie_name,lead_actor)
        VALUES (${directorId},${movieName},${leadActor};`;
  await db.run(updateMovie);
  response.send("Movie Successfully Added");
});
