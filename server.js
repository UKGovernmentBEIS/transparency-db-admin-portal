// **************************************************************************
// Gov.UK Transparency database - server.js (the main driver to render the site)
// **************************************************************************

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port);

console.log("Server running at http://localhost:3000");
