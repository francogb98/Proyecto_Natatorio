import Activity from "../../models/Actividades.js";

export const findHoursFromDay = async (root, args) => {
  const { date } = args;
  console.log(args);
  return await Activity.find({
    date: { $in: [date] },
  }).populate({
    path: "users",
    populate: { path: "activity" },
  });
};

export const findUsersFromHour = async (root, args) => {
  const { date, hourStart, hourFinish } = args;

  return await Activity.find({
    date: { $in: [date] },
    hourStart,
    hourFinish,
  }).populate({
    path: "users",
    populate: { path: "activity" },
  });
};
