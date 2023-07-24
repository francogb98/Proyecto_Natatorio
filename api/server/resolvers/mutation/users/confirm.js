import { UserInputError } from "apollo-server";
import User from "../../../models/User.js";

import QRCode from "qrcode";

export const confirmAccount = async (root, args) => {
  const { token } = args;

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new UserInputError("token no valido", {
      invalidArgs: args,
    });
  }
  if (user.emailVerified) {
    throw new UserInputError("usuario ya verificado", {
      invalidArgs: args,
    });
  }

  QRCode.toDataURL(user.dni, user, async function (err, url) {
    if (err) throw err;

    const userUpdate = await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          emailVerified: true,
          emailVerificationToken: null,
          qr: url,
        },
      },
      { new: true }
    );
    return userUpdate;
  });
};
