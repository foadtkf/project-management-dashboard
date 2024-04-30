import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  deadline: {
    type: Date,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
});
const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  teamMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [taskSchema],
  recentActivities: [
    {
      type: String,
      trim: true,
    },
  ],
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
