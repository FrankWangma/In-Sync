import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Create database scheme for notes
 */
const RoomSchema = new Schema({
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

var Room = mongoose.model('Room', RoomSchema);

export default Room;
