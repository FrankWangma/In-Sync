import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const { Schema } = mongoose;
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

/**
 * Create database scheme for notes
 */
const RoomSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  host: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    default: '',
  },
  viewers: [{
    type: String,
  }],
});

var Room = mongoose.model('Room', RoomSchema);

export default Room;
