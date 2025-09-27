import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true, 
    },
    filename: {
      type: String, 
    },
    mimeType: {
      type: String, 
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Media =  mongoose.model('Media', MediaSchema);

export default Media ;