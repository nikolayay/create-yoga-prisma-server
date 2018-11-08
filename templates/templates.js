module.exports = {
  // config, two dots for dot-files
  "config..env.js": require("./config_files/.env.js"),
  "config..graphqlconfig.yml.js": require("./config_files/.graphqlconfig.yml.js"),
  "config.datamodel.prisma.js": require("./config_files/datamodel.prisma.js"),
  "config.prisma.yml.js": require("./config_files/prisma.yml.js"),
  // server
  "server.createServer.js": require("./server/createServer"),
  "server.db.js": require("./server/db"),
  "server.index.js": require("./server/index"),
  "server.schema.graphql.js": require("./server/schema.graphql.js"),
  // resolvers
  "resolver.Query.js": require("./resolvers/Query"),
  "resolver.Mutation.js": require("./resolvers/Mutation")
};
