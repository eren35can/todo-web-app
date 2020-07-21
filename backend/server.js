require('dotenv').config();

const app = require('./src/index');

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Listening on port " + port);
});