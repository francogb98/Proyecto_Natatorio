import { UserInputError } from "apollo-server";

const verificData = (date, hourStart, hourFinish) => {
  if (!date || !hourStart || !hourFinish) {
    throw new UserInputError("Falta inforamcion por añadir", {
      invalidArgs: { date, hourStart, hourFinish },
    });
  }
  const timePattern = /^([1-9]|1\d|2[0-3]):([0-5][0-9])$/;

  if (!timePattern.test(hourStart) || !timePattern.test(hourFinish)) {
    throw new UserInputError("El horario tiene el formato incorrecto.", {
      invalidArgs: { date, hourStart, hourFinish },
    });
  }
  if (
    date !== "Lunes" &&
    date !== "Martes" &&
    date !== "Miercoles" &&
    date !== "Jueves" &&
    date !== "Viernes"
  ) {
    throw new UserInputError("Corrija la fecha", {
      invalidArgs: { date, hourStart, hourFinish },
    });
  }
  //verificamos que los horarios no sean iguales
  if (hourFinish == hourStart) {
    throw new UserInputError("Duplicidad de horarios", {
      invalidArgs: { date, hourStart, hourFinish },
    });
  }
};

export default verificData;
