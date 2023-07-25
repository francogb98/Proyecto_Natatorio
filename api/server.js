import { ApolloServer } from "apollo-server";

import "./db.js";

import User from "./server/models/User.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import typeDefinitions from "./server/types/types.js";
import resolvers from "./server/resolvers/resolvers.js";

const JWT_SECRET = process.env.JWT_SECRET;

//las mutaciones en graphql tienen que devolver un dato, por eso le ponemos el :Person, :User

// Habilitar CORS para todas las solicitudes

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      //bearer qsiouhdquiwhduiqwdhiqwudhqwiudqwh

      const token = auth.substring(7);

      const decodedToken = jwt.verify(token, JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
  cache: "bounded",
});

export default server;
