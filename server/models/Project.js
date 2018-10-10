const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../utils/config');

const url = config.mongoUrl;

mongoose.connect(url);

const projectSchema = new Schema({
  name: String,
  taskBoard: Schema.Types.Mixed,
  test: String
});

projectSchema.statics.format = (project) => {
  return {
    name: project.name,
    taskBoard: project.taskBoard,
    id: project._id
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;