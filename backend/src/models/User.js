import mongoose from 'mongoose';

const { Schema } = mongoose;

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
    // eslint-disable-next-line no-param-reassign
    delete ret._id;
    // eslint-disable-next-line no-param-reassign
    delete ret.hash;
  },
});

export default mongoose.model('User', UserSchema);
