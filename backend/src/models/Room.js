import mongoose, {
  Schema,
} from 'mongoose';

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

export default mongoose.model('Room', RoomSchema);
