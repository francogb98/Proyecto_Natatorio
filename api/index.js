import server from "./server.js";

server.listen().then(({ url }) => {
  console.log("Sever ready at" + url);
});
