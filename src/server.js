const express = require("express");

const bodyParser = express.urlencoded({ extended: true });

const server = express();

const cheeses = [];

server.get("/", (request, response) => {
    response.send(`<h1>Hello Express</h1>`)
});

// server.get("/colour", (request, response) => {
//     const colour = request.query.hex || "FFFFFF";
//     response.send(`
//     <!doctype html>
//     <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Home</title>
//         <style>
//         body {background-color: #${colour}};
//         </style>
//       </head>
//       <body>
//         <h1>Hello</h1>
//         <form action="/colour" method="GET">
//             <input type="text" name="hex">
//             <button type="submit">Submit</button>
//         </form>
//       </body>
//     </html>
//   `);
//   });

  server.get("/cheese", (request, response, next) => {
    const list = cheeses.map((cheese) => {    
        return `<li>${cheese.cheese} | ${cheese.rating} stars</li>`
    });
    response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
      </head>
      <body>
        <h1>Hello</h1>
        <form action="/cheese" method="POST">
            <input type="text" name="cheese">
            <input type="range" min="0" max="5" value="2.5" step="0.5" name="rating">
            <button type="submit">Rate cheese</button>
        </form>
        <ul>${list.join("")}</ul>
      </body>
    </html>
    `)
    next();
  })

  server.post("/cheese", bodyParser, (request, response) => {
    const cheese = request.body.cheese;
    const rating = request.body.rating;
    cheeses.push({cheese, rating});
    response.redirect("/cheese");
  })

module.exports = server;
