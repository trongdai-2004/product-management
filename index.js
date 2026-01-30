const express = require('express')
const database = require("./config/database");

const systemConfig = require("./config/system")
require('dotenv').config();
const app = express()
const port = process.env.PORT

// app local variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))

const routeAdmin = require ("./routes/admin/index.route")
const route = require ("./routes/client/index.route")


database.connect();

routeAdmin(app)
route(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


