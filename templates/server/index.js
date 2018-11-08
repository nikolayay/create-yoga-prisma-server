// let's go!
module.exports = `require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(\`Server now running on port http:/localhost:\${deets.port}\`);
  }
);`;
