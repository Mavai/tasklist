const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  taskboards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taskboard' }]
});

projectSchema.statics.format = project => {
  if (!project) return null;
  return {
    name: project.name,
    taskboards: project.taskboards.map(taskboard => ({
      id: taskboard._id,
      name: taskboard.name
    })),
    id: project._id
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
