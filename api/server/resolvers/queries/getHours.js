import Horarios from "../../models/Horarios.js";

export const getHours = async () => {
  const hours = await Horarios.find();

  return hours;
};
