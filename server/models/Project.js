const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../utils/config');

const url = config.mongoUrl;

mongoose.connect(url);

const projectSchema = new Schema({
  name: String
});

projectSchema.statics.format = (project) => {
  return {
    name: project.name,
    id: project._id
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;