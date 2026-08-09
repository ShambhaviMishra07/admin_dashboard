import mongoose from 'mongoose';

// Singleton document — only ever one Settings row exists
const settingsSchema = new mongoose.Schema(
  {
    inviteCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;