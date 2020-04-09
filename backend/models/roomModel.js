import mongoose, {
    Schema
} from 'mongoose';

/**
 * Create database scheme for notes
 */
const RoomScheme = new Schema({
    id: {
        type: String,
        required: "What is the rooms id?"
    },
});

export default mongoose.model('Room', RoomScheme);
