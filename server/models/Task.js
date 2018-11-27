const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Status = require('./Status');
const Project = require('./Project');

const taskSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: String,
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
  },
  { timestamps: true }
);

taskSchema.statics.format = task => {
  if (!task) return null;
  return {
    name: task.name,
    description: task.description,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    status: Status.format(task.status),
    project: Project.format(task.project),
    id: task._id
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
