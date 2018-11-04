const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  taskBoard: Schema.Types.Mixed,
  test: String
});

projectSchema.statics.format = (project) => {
  if (!project) return null;
  return {
    name: project.name,
    taskBoard: project.taskBoard,
    id: project._id
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;