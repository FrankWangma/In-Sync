import mongoose, {
  Schema,
} from 'mongoose';
import {} from mongo

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

/**
 * Create database scheme for notes
 */
const RoomSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  video: {
    type: String,
    default: '',
  },
  viewers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

export default mongoose.model('Room', RoomSchema);
