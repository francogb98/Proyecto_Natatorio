import { UserInputError } from "apollo-server";
import Activity from "../../../../models/Actividades.js";
import Horarios from "../../../../models/Horarios.js";
import Day from "../../../../models/Days.js";

const find = async (
  type,
  name,
  date,
  hourStart,
  hourFinish,
  isHourExist,
  isActivityExists
) => {
  switch (type) {
    //-----------------  activity   --------------------//
    case "activity":
      let activity = await Activity.findOne({ name });
      if (!activity)
        throw new UserInputError("Actividad no Encontrada", {
          invalidArgs: { name },
        });
      return activity;
      break;
    //-----------------          hour       -----------------//
    case "hour": {
      const result = await Horarios.findOne({
        hourStart,
        hourFinish,
        date,
      });
      //si el horario no existe tiramos un error
      if (!result) {
        throw new UserInputError("El horario seleccionado no existe", {
          invalidArgs: { date },
        });
      }
      return result;
      break;
    }
    //----------------            day           -------------------//
    case "day": {
      const result = await Day.findOne({
        nameDate: date,
        hours: { $elemMatch: { $eq: isHourExist._id } },
      });
      //si no existe tiramos un error
      if (!result) {
        throw new UserInputError("El Dia seleccionado no existe", {
          invalidArgs: { date },
        });
      }
      return result;
      break;
    }
    //---------------                dayForActivity          ------------//
    case "dayForActivity": {
      const result = await Horarios.findOne({
        hourStart,
        hourFinish,
        date,
        activity: { $elemMatch: { $eq: isActivityExists._id } },
      });

      if (result) {
        throw new UserInputError("actividad ya creada en este horario", {
          invalidArgs: { date, name },
        });
      }
      return result;
      break;
    }

    default:
      break;
  }
};

export default find;
