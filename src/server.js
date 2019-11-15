import App from "./App";
import React from "react";
import { StaticRouter , matchPath} from "react-router-dom";
import Routes from './Routes';
import express from "express";
import { renderToString } from "react-dom/server";
import OldTasks from './OldTasks';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

server.get("/register", (req, res) => {
  var userName = req.query.username;
  //first find user
  var doesUserNameExists = db
    .get("users")
    .find({ name: userName })
    .value();
  if (doesUserNameExists) {
    // do nothing
    res.send({ found: true });
  } else {
    // add user to db
    db.get("users")
      .push({ name: userName, tasks: [] })
      .write();
    res.send({ added: true });
  }
});
server.get("/add", (req, res) => {
  var { taskname, project, start_time, end_time, username } = req.query;
  //find loggedin user in db
  var userObject = db.get("users").find({ name: username });
  // then find his tasks
  var currentTasks = userObject.value().tasks;
  //then create new array of tasks
  currentTasks.push({
    taskname,
    project,
    start_time: parseInt(start_time),
    end_time: parseInt(end_time)
  });
  //then update the tasks in db
  userObject.assign({ tasks: currentTasks }).write();
  res.send({ done: true });
});

server.get("/get", (req, res) => {
  var { username } = req.query;
  // send tasks from db of logged in user
  var userObjectValue = db
    .get("users")
    .find({ name: username })
    .value();
  res.send(userObjectValue.tasks);
});

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    const currentRoute =
    Routes.find(route => matchPath(req.path, route)) || {};
    let data = {};
    if(currentRoute && currentRoute.getData){
       data = await currentRoute.getData(req.query.username);
    }
    
     const context = {data};
    //  console.log(data);
    const markup = renderToString(
      <StaticRouter context={context} location={req.path}>
        <App data={data}/>
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        <link rel="stylesheet" href="/app.css"/>

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Task App</title>
        <script>window.state = ${JSON.stringify(data)}</script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

// // Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()

// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()

// // Increment count
// db.update('count', n => n + 1)
//   .write()
export default server;
