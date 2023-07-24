import { UserInputError } from "apollo-server";
import Activity from "../../../models/Actividades.js";

import Horarios from "../../../models/Horarios.js";
import Day from "../../../models/Days.js";

const createActivity = async (root, args) => {
  try {
    const { activity, hourStart, hourFinish, nameDate, userRegister, pileta } =
      args;

    //buscamos el horario
    let hour = await Horarios.findOne({ hourStart, hourFinish });

    if (!hour) {
      throw new UserInputError(
        "Horario no creado, por favor crear horario nuevo",
        {
          invalidArgs: { hourStart, hourFinish },
        }
      );
    }

    //buscamos SI LOS DIAS EXISTEN
    const dayExist = await Promise.all(
      nameDate.map(async (name) => {
        const day = await Day.findOne({ nameDate: name });
        return day ? true : name; // Retorna true si el día existe, de lo contrario, retorna false
      })
    );
    const isFalse = dayExist.filter((e) => e !== true);
    if (isFalse.length) {
      throw new UserInputError("El/Los dia seleccionado no existe.", {
        invalidArgs: { isFalse },
      });
    }
    console.log(pileta);
    if (pileta !== "50mts" && pileta !== "25mts") {
      throw new UserInputError(
        "Ingrese correctamente el nombre de la pileta (25mts o 50mts)",
        {
          invalidArgs: { pileta },
        }
      );
    }

    const isActivityAlrederyExists = await Activity.findOne({
      name: activity,
      hourStart,
      hourFinish,
      date: nameDate,
    });
    if (isActivityAlrederyExists) {
      throw new UserInputError("Actividad ya creada en este horario.", {
        invalidArgs: { isFalse },
      });
    }
    let createActivity = new Activity({
      name: activity,
      hourStart,
      hourFinish,
      date: nameDate,
      userRegister,
      pileta,
    });
    await createActivity.save();

    return await Activity.findOne({
      name: activity,
      hourStart,
      hourFinish,
      date: nameDate,
      pileta,
    });
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    });
  }
};

export default createActivity;
