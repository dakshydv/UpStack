import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    maxlength: [60, "Name cannot be more than 60 characters"],
    trim: true,
    unique: true,
  },
});

const MonitorSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  url: {
    type: String,
    required: [true, "Please provide a url"],
  },
  status: {
    type: String,
    required: true,
  },
  alertOn: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
  keyword: {
    type: String,
  },
  expectedStatus: {
    type: Number,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

// export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
// export const MonitorModel = mongoose.models.Monitor || mongoose.model("Monitor", MonitorSchema);
export const UserModel =
  (mongoose.models && mongoose.models.User) ||
  mongoose.model("User", UserSchema);
export const MonitorModel =
  (mongoose.models && mongoose.models.Monitor) ||
  mongoose.model("Monitor", MonitorSchema);
