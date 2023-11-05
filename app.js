// Importing necessary packages
const express = require("express");
const app = express();

// Setting up Handlebars as the template/view engine
const exphbs = require("express-handlebars");

// Handlebars initialization with custom helpers
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        replaceBlank: (value) => {
            return value === "blank" ? "unknown" : value;;
        },
        equal: (v1, v2) => v1 === v2
    }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");

// Defining the port for the app, 3000 is the fallback value.
const port = process.env.port || 3000;
// Routes
const routes = require('./routes/routes');

app.use('/', routes);

// Starting the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
