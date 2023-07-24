import Activity from "../../models/Actividades.js";

export const getActivities = async () => {
  return await Activity.find().populate({
    path: "date",
    populate: { path: "date" },
  });
};
