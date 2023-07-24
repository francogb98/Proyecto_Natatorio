import User from "../../../models/User.js";
import {
  generateVerificationToken,
  emailRegistro,
} from "../middlewares/emailVerification.js";

import { UserInputError } from "apollo-server";
import bcrypt from "bcrypt";

const createUser = async (root, args) => {
  const { email, password, dni, nombreTutor, dniTutor } = args;

  if (isNaN(dni)) {
    throw new UserInputError("Inserte un documento valido", {
      invalidArgs: { dni },
    });
  }
  if (dni === dniTutor) {
    throw new UserInputError("Los documentos no pueden ser iguales", {
      invalidArgs: { dni },
    });
  }

  const isEamilExist = await User.findOne({ email });
  //verificamos si exite el email
  if (isEamilExist) {
    throw new UserInputError("Email ya existe", {
      invalidArgs: { email },
    });
  }

  const isDniExist = await User.findOne({ dni });
  //verificamos si exite el email
  if (isDniExist) {
    throw new UserInputError("Dni ya registado", {
      invalidArgs: { dni },
    });
  }

  if (args.edad < 18 && !nombreTutor && !dniTutor) {
    throw new UserInputError("Por favor añadir informacion del tutor", {
      invalidArgs: { nombreTutor, dniTutor },
    });
  }

  try {
    //encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //generamos un token de verificacion

    const verificationToken = generateVerificationToken();

    const user = new User({
      ...args,
      password: hashedPassword,
      emailVerified: false,
      asistencia: false,
      role: "usuario",
      qr: null,
      status: false,
      emailVerificationToken: verificationToken,
    });

    await user.save();

    //mandamos el email para la confirmacion del token
    await emailRegistro(user.email, user.nombre, verificationToken);

    return user;
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export default createUser;
