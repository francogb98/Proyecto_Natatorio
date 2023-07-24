import { UserInputError } from "apollo-server";
import User from "../../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "AQUI_TU_PALABNRA_SECRETA_PARA_GENERAR_TOKENS_SEGUROS";

const login = async (root, args) => {
  //verificamos si el usuario existe
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new UserInputError("El correo no se encuentra registrado");
  }
  //comparamos las contraseñas
  const pass = await bcrypt.compare(args.password, user.password);
  //devolvemos un error en caso de que alguno no funcione
  if (!user || !pass) {
    throw new UserInputError("Credenciales incorrectas");
  }

  if (!user.emailVerified) {
    throw new UserInputError(
      "Email No verificado, por favor verifique su correo"
    );
  }

  //creamos el token de autenticacion
  const userForToken = {
    nombre: user.nombre,
    id: user._id,
  };
  return {
    value: jwt.sign(userForToken, JWT_SECRET),
    role: user.role,
  };
};

export default login;
