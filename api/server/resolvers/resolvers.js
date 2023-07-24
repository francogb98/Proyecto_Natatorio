import createUser from "./mutation/users/createUser.js";
import createActivity from "./mutation/activity/createActivity.js";
import createHour from "./mutation/horarios/createHour.js";
import login from "./mutation/users/loginUser.js";
import { confirmAccount } from "./mutation/users/confirm.js";

import addUserFromActivity from "./mutation/horarios/addUserFromActivityAndDay.js";

import createDay from "./mutation/days/createDay.js";

//queries
import {
  findHoursFromDay,
  findUsersFromHour,
} from "./queries/findHoursFromDay.js";
import { findAllUsers } from "./queries/findAllUser.js";
import { getHours } from "./queries/getHours.js";
import { getActivities } from "./queries/getActivities.js";

//MODELS
import Day from "../models/Days.js";
import Activity from "../models/Actividades.js";
import User from "../models/User.js";

const resolvers = {
  Query: {
    userCount: () => {
      return User.collection.countDocuments();
    },

    findHoursFromDay,
    findUsersFromHour,
    getHours,
    getActivities,

    me: async (root, args, context) => {
      return User.findOne({ dni: context.currentUser.dni }).populate({
        path: "activity",
      });
    },
    findAllUsers,
  },
  Mutation: {
    createUser,
    login,
    createActivity,
    createDay,
    createHour,
    addUserFromActivity,
    confirmAccount,
  },

  // User: {
  //   activiti: (root) => {
  //     return {};
  //   },
  // },
  // Person: {
  //   address: (root) => {
  //     return {
  //       street: root.street,
  //       city: root.city,
  //     };
  //   },
  // },
};

export default resolvers;
