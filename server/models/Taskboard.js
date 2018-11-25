const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = require('./Project');

const taskboardSchema = new Schema({
  name: { type: String },
  board: Schema.Types.Mixed,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

taskboardSchema.statics.format = (taskboard) => {
  if (!taskboard) return null;
  return {
    name: taskboard.name,
    board: taskboard.board,
    project: Project.format(taskboard.project),
    id: taskboard._id
  };
};

const Taskboard = mongoose.model('Taskboard', taskboardSchema);

module.exports = Taskboard;