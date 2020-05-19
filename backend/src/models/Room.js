import mongoose, {
  Schema,
} from 'mongoose';
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7)

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
