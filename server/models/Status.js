const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  name: String,
  color: String
});

statusSchema.statics.format = status => {
  if (!status) return null;
  return {
    name: status.name,
    color: status.color,
    id: status._id
  };
};

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
