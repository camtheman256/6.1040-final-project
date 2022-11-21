import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';


export type User = {
  _id: Types.ObjectId; //mongoDB
  gapiUserId: string;
  name: string;
  imageUrl: string;
  email: string;
  dateJoined: Date;
};


const UserSchema = new Schema({
  gapiUserId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  dateJoined: {
    type: Date,
    required: true
  },
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;