import mongoose, {
  Schema,
} from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    default: '',
  },
});

export default mongoose.model('User', UserSchema);
