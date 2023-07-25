import server from "./server.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === procees.env.FRONTEND_URL) {
    // Si el origen coincide con la URL del frontend permitida, se habilita CORS solo para ese origen
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  next();
});

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app });

  // Puerto en el que se ejecutará el servidor
  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Servidor Apollo GraphQL en http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
