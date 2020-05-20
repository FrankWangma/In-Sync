import mongoose, {
  Schema,
} from 'mongoose';

/**
 * Create database scheme for notes
 */
const RoomSchema = new Schema({
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

export default mongoose.model('Room', RoomSchema);
