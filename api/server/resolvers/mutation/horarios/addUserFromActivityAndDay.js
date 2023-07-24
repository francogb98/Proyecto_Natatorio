import Activity from "../../../models/Actividades.js";
import User from "../../../models/User.js";

import { UserInputError } from "apollo-server";

const addUserFromActivity = async (root, args, context) => {
  const { id } = args;

  if (context.currentUser.activity.length) {
    throw new UserInputError(
      "El usuario ya se encuentra inscripto en una actividad",
      {
        invalidArgs: { id },
      }
    );
  }

  const isActivityExist = await Activity.findById({
    _id: id,
  });
  if (!isActivityExist) {
    throw new UserInputError("La actividad seleccionada no existe", {
      invalidArgs: { id },
    });
  }

  //verificamos si el usuario ya esta registrado en la actividad
  if (
    isActivityExist &&
    isActivityExist.users.includes(context.currentUser._id)
  ) {
    throw new UserInputError(
      "El usuario ya se encuentra inscripto en la actividad",
      {
        invalidArgs: { id },
      }
    );
  }
  //verificamos si hay cupo
  if (isActivityExist.userRegister > 50) {
    throw new UserInputError("Cupos agotados", {
      invalidArgs: { id },
    });
  }

  //extraemos la infromacion del usuario
  const isUserExist = await User.findOne({
    _id: context.currentUser._id,
  });

  //agregamos el usuario, e incrementamos el cupo
  await Activity.findOneAndUpdate(
    { _id: isActivityExist._id },
    { $push: { users: isUserExist }, $inc: { userRegister: 1 } },
    { new: true }
  );

  //le añadimos al usuario la actividad, con sus respectivos horarios
  await User.findOneAndUpdate(
    { _id: isUserExist._id },
    { $push: { activity: isActivityExist } },
    { new: true }
  );

  return await Activity.findById({
    _id: id,
  }).populate("users");
};

export default addUserFromActivity;
