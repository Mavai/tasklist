const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Status = require('./Status');

const taskSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: String,
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    taskboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Taskboard' },
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
    taskboard: task.taskboard ? task.taskboard._id : null,
    project: task.project._id,
    id: task._id
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
