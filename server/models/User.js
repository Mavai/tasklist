const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

userSchema.statics.format = user => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    projects: user.projects,
    passwordHash: user.passwordHash
  };
};

userSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique.'
});
const User = mongoose.model('User', userSchema);

module.exports = User;
