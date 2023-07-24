import { UserInputError } from "apollo-server";
import Horarios from "../../../models/Horarios.js";

const createHour = async (root, args) => {
  const { hourStart, hourFinish } = args;

  try {
    const timePattern = /^([1-9]|1\d|2[0-3]):([0-5][0-9])$/;

    if (!timePattern.test(hourStart) || !timePattern.test(hourFinish)) {
      throw new UserInputError("El horario tiene el formato incorrecto.", {
        invalidArgs: { hourStart, hourFinish },
      });
    }
    //buscamos si los horarios existen
    let hour = await Horarios.findOne({ hourStart, hourFinish });

    if (hour) {
      throw new UserInputError("El horario seleccionado ya existe.", {
        invalidArgs: { hourStart, hourFinish },
      });
    }

    hour = new Horarios({ hourStart, hourFinish });
    await hour.save();

    return await Horarios.findOne({ hourStart, hourFinish });
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export default createHour;
