import { UserInputError } from "apollo-server";

import Day from "../../../models/Days.js";

const createDay = async (root, args) => {
  try {
    const { nameDate } = args;
    if (
      nameDate !== "Lunes" &&
      nameDate !== "Martes" &&
      nameDate !== "Miercoles" &&
      nameDate !== "Jueves" &&
      nameDate !== "Viernes"
    ) {
      throw new UserInputError("Corrija la fecha", {
        invalidArgs: { nameDate },
      });
    }

    let day = await Day.findOne({ nameDate });
    console.log(day);
    if (day) {
      throw new UserInputError("El dia seleccionado ya existe.", {
        invalidArgs: { nameDate },
      });
    }

    day = new Day({ nameDate });
    await day.save();

    return await Day.findOne({ nameDate });
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export default createDay;
