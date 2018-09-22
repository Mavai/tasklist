const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../utils/config');

const url = config.mongoUrl;

mongoose.connect(url);

const statusSchema = new Schema({
  name: String,
  color: String
});

statusSchema.statics.format = (status) => {
  return {
    name: status.name,
    color: status.color,
    id: status._id
  };
};

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;