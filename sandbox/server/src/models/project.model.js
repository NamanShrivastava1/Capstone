import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    default: "untitled Project",
  },
});

const projectModel = mongoose.model("project", projectSchema);

export default projectModel;
