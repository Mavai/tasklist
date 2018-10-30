const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Status = require('./Status');
const Project = require('./Project');
const config = require('../utils/config');

const url = config.mongoUrl;

mongoose.connect(url);

const taskSchema = new Schema({
  name: String,
  description: String,
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

taskSchema.statics.format = (task) => {
  return {
    name: task.name,
    description: task.description,
    status: Status.format(task.status),
    project: Project.format(task.project),
    id: task._id
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;