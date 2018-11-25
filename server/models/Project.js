const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  taskBoard: Schema.Types.Mixed,
  taskboards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taskboard' }]
});

projectSchema.statics.format = (project) => {
  if (!project) return null;
  return {
    name: project.name,
    taskBoard: project.taskBoard,
    taskboards: project.taskboards,
    id: project._id
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;