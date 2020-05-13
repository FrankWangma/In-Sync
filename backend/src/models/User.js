import mongoose, {
  Schema,
} from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: { 
    type: String, 
    required: true 
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
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

export default mongoose.model('User', UserSchema);
