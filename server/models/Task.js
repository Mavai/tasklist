const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../utils/config');

const url = config.mongoUrl;

mongoose.connect(url);

const taskSchema = new Schema({
  name: String,
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
});

taskSchema.statics.format = (task) => {
  return {
    name: task.name,
    status: task.status,
    project: task.project,
    id: task._id
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;