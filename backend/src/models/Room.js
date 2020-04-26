import mongoose, {
  Schema,
} from 'mongoose';

/**
 * Create database scheme for notes
 */
const RoomSchema = new Schema({
  Host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Video: {
    type: String,
    default: '',
  },
  Viewers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

export default mongoose.model('Room', RoomSchema);
