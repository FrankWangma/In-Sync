import mongoose, {
  Schema,
} from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    default: '',
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

var User = mongoose.model('User', UserSchema);

export default User;
