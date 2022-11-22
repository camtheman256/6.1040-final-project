import type { HydratedDocument, Types } from "mongoose";
import type { User } from "./model";
import UserModel from "./model";

class UserCollection {
  static async addOne(
    gapiUserId: string,
    name: string | undefined,
    imageUrl: string | undefined,
    email: string | undefined
  ): Promise<HydratedDocument<User>> {
    const dateJoined = new Date();
    const user = new UserModel({
      gapiUserId,
      name,
      imageUrl,
      email,
      dateJoined,
    });
    await user.save();
    return user;
  }

  static async findOneFromGapiUserId(
    gapiUserId: string
  ): Promise<HydratedDocument<User> | null> {
    return UserModel.findOne({
      gapiUserId: gapiUserId as string,
    });
  }
}
export default UserCollection;
