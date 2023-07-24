import {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  gql,
} from "apollo-server";
import { v1 as uuid } from "uuid";
import "./db.js";

import User from "./server/models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import typeDefinitions from "./server/types/types.js";
import resolvers from "./server/resolvers/resolvers.js";

const JWT_SECRET = "AQUI_TU_PALABNRA_SECRETA_PARA_GENERAR_TOKENS_SEGUROS";

//las mutaciones en graphql tienen que devolver un dato, por eso le ponemos el :Person, :User

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
});

export default server;
