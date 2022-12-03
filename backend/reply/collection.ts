import type { HydratedDocument, Types } from "mongoose";
import type { Reply } from "./model";
import ReplyModel from "./model";

class ReplyCollection {
  static async addOne(
    author: string,
    request: string,
    textContent: string,
    /*dateCreated: Date,*/
    anonymous: boolean /*upvotingUsers: Array<string>,*/ /*inProcess: boolean*/
    /*resolved: boolean,*/
  ): Promise<HydratedDocument<Reply>> {
    const date = new Date();
    const userArray: Array<string> = [];
    const reply = new ReplyModel({
      author,
      request,
      textContent,
      dateCreated: date,
      anonymous,
      upvotingUsers: userArray,
    });
    await reply.save();
    return reply;
  }

  static async findByAuthorSpace(
    request_id: string | undefined,
    userId: string | undefined
  ): Promise<Array<HydratedDocument<Reply>>> {
    if (request_id !== undefined && userId !== undefined) {
      return ReplyModel.find({
        request: request_id,
        author: userId,
      });
    } else if (request_id !== undefined) {
      return ReplyModel.find({ space: request_id });
    } else {
      return ReplyModel.find({ author: userId });
    }
  }

  static async findAll(): Promise<Array<HydratedDocument<Reply>>> {
    return ReplyModel.find({});
  }

  static async findOneById(
    replyId: string
  ): Promise<HydratedDocument<Reply> | null> {
    return ReplyModel.findOne({ _id: replyId as string });
  }

  static async deleteOne(replyId: string): Promise<void> {
    ReplyModel.deleteOne({ _id: replyId });
  }
}
export default ReplyCollection;
