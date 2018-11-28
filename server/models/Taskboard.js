const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskboardSchema = new Schema({
  name: { type: String },
  layout: Schema.Types.Mixed,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

taskboardSchema.statics.format = taskboard => {
  if (!taskboard) return null;
  return {
    name: taskboard.name,
    layout: taskboard.layout,
    project: taskboard.project,
    id: taskboard._id
  };
};

const Taskboard = mongoose.model('Taskboard', taskboardSchema);

module.exports = Taskboard;
